module.exports = class MockProvider2 {
    constructor() {
        this.name = "MockProvider2";
    }
    async send(email) {
        console.log(`🟡 ${this.name} attempting to send email to ${email.to}`);
        await new Promise((res) => setTimeout(res, 300));
        if (Math.random() < 0.8) {
            return { success: true, provider: this.name };
        } else {
            throw new Error(`❌ ${this.name} failed to send email`);
        }
    }
};
