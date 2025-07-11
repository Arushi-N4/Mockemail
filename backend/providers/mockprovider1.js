module.exports = class MockProvider1 {
    constructor() {
        this.name = "MockProvider1";
    }
    async send(email) {
        console.log(`🟡 ${this.name} attempting to send email to ${email.to}`);
        await new Promise((res) => setTimeout(res, 3000));
        if (Math.random() < 0.7) {
            return { success: true, provider: this.name };
        } else {
            throw new Error(`❌ ${this.name} failed to send email`);
        }
    }
};
