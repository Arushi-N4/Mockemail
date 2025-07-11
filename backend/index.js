const express = require('express')
const cors = require('cors')
const path = require('path')

const EmailService = require('./emailservice');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const service = new EmailService();

app.get('/logs', (req, res) => {
    const all = service.statusTracker.getAll();
    res.json(all);
});


app.post('/send-email', async (req, res) => {
    const email = req.body;
    const result = await service.sendEmail(email);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
