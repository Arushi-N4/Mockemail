
const MockProvider1 = require('./providers/mockprovider1');
const MockProvider2 = require('./providers/mockprovider2');
const RateLimiter = require('./limit');
const StatusTracker = require('./status');

class EmailService {
    constructor() {
        this.providers = [new MockProvider1(), new MockProvider2()];
        this.idempotencyStore = new Set();
        this.maxRetries = 3;
        this.baseDelay = 700;
        this.rateLimiter = new RateLimiter(5, 10000);
        this.statusTracker = new StatusTracker();
    }

    async sendWithRetry(provider, email, logs = []) {
        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                const msg1 = `Attempt ${attempt} using ${provider.name}`;
                logs.push(msg1);
                this.statusTracker.appendLog(email.id, msg1);

                const result = await provider.send(email);
                return result;
            } catch (err) {
                const errMsg = `Error: ${err.message}`;
                logs.push(errMsg);
                this.statusTracker.appendLog(email.id, errMsg);
                console.log(`❌ failed to send email`);
                if (attempt < this.maxRetries) {
                    const delay = this.baseDelay * 2 ** (attempt - 1);
                    const retryMsg = `⏳ Retrying in ${delay}ms...`;
                    logs.push(retryMsg);
                    this.statusTracker.appendLog(email.id, retryMsg);
                    await new Promise((res) => setTimeout(res, delay));
                }
            }
        }
        throw new Error(`⚠️ ${provider.name} failed after ${this.maxRetries} attempts`);
    }


    async sendEmail(email) {
        const { id } = email;
        const logs = [];
        if (!this.rateLimiter.allow()) {
            this.statusTracker.update(id, "limit reached");
            logs.push(`🟠 Limit is reached. Try after few seconds`);
            return { status: "Limit is reached. Try after few seconds", logs };
        }

        if (this.idempotencyStore.has(id)) {
            this.statusTracker.update(id, "duplicate");
            logs.push(`🔁 You already sent same email. Change it`);
            this.statusTracker.appendLog(id, `🔁 You already sent same email. Change it`);
            return { status: "duplicate", logs }
        }

        for (let provider of this.providers) {
            try {
                const result = await this.sendWithRetry(provider, email, logs);
                this.idempotencyStore.add(id);
                this.statusTracker.update(id, "Email sent", { provider: result.provider });
                logs.push(`✅ ${id} :- Email sent`);
                this.statusTracker.appendLog(id, `✅ ${id} :- Email sent`);
                return { status: "sent", provider: result.provider, logs };
            } catch (err) {
                logs.push(`⚠️ ${provider.name} failed after retries`);
            }
        }
        this.statusTracker.update(id, "failed");
        logs.push(`🚫 ${id} -> failed`);
        this.statusTracker.appendLog(id, `🚫 ${id} -> failed`);
        return { status: "failed", logs };
    }
}

module.exports = EmailService;
