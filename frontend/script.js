document.getElementById('emailForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;
    const id = generateEmailId(to, subject, body);
    const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, to, subject, body })
    });
    const result = await response.json();
    showPopup(`Status: ${result.status}`);
    showLogs(result.logs);
});

function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.className = 'show';
    setTimeout(() => popup.className = '', 2000);
}

function showLogs(logs) {
    const logArea = document.getElementById('logArea');
    logArea.textContent = logs.join('\n\n');
}

function generateEmailId(to, subject, body) {
    return 'id-' + btoa(to + subject + body).slice(0, 20);
}


