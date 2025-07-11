class StatusTracker {
    constructor() {
        this.statuses = {};
        this.logs = {};
    }

    update(emailId, status, metadata = {}) {
        this.statuses[emailId] = {
            status,
            timestamp: new Date().toISOString(),
            ...metadata
        };
        console.log(`🎯 ${emailId} -> ${status}`);
    }

    appendLog(emailId, message) {
        if (!this.logs[emailId]) {
            this.logs[emailId] = [];
        }
        this.logs[emailId].push(message);
    }

    getStatusWithLogs(emailId) {
        return {
            status: this.statuses[emailId] || null,
            logs: this.logs[emailId] || []
        };
    }


    getAll() {
        const result = {};
        for (const id in this.statuses) {
            result[id] = this.getStatusWithLogs(id);
        }
        return result;
    }

}

module.exports = StatusTracker;
