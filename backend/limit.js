class RateLimiter {
    constructor(limit, intervalMs) {
        this.limit = limit;
        this.intervalMs = intervalMs;
        this.tokens = limit;
        this.lastRefill = Date.now();
        this.interval = setInterval(() => this.refill(), intervalMs);
        this.interval.unref?.();
    }

    refill() {
        const now = Date.now();
        if (now - this.lastRefill >= this.intervalMs) {
            this.tokens = this.limit;
            this.lastRefill = now;
        }
    }

    allow() {
        if (this.tokens > 0) {
            this.tokens--;
            return true;
        }
        return false;
    }

    stop() {
        clearInterval(this.interval);
    }
}

module.exports = RateLimiter;
