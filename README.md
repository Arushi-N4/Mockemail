# 📧 Mock Email Sender (Node.js + JS Frontend)

Mockemail is a project that helps developers test email features without using real email accounts. It creates fake email addresses and simulates sending emails.It uses multiple email providers (like MockProvider1 and MockProvider2) to ensure reliability—if one fails, it automatically switches to another. The service includes rate limiting to prevent overuse, idempotency checks to avoid duplicate emails, and automatic retries with increasing delays if sending fails. It also keeps track of each email's status and logs all attempts for debugging.

### 🌟 Features

- 🔄 Retries with exponential delay on failure
- ⚠️ Provider fallback if one fails
- 🚦 Rate limiter to avoid abuse (5 email per 10s)
- 🧠 Idempotency based on unique email ID
- ✅ Live logs

### 📁 Project Structure
```
Mockemail/
│
├── backend/
│   ├── emailservice.js
│   ├── index.js (server)
│   ├── providers/
│   │   ├── mockprovider1.js
│   │   └── mockprovider2.js
│   ├── limit.js
│   └── status.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
````


### Getting Started

### 1. Clone the repository

```bash
https://github.com/Arushi-N4/Mockemail.git
````

### 2. Install dependencies
```bash
npm install express cors path
```

### 3. Run the server
```bash
cd backend
node index.js
```
Server runs at: [http://localhost:3000](http://localhost:3000)



## 🧪 Usage

1. Open the frontend in your browser.
2. Enter recipient, subject, and message.
3. Click **Send Email**.
4. Popup will show status and logs appear below the form.

---

### ⚙️ Customize

* Change retry count/delay in `emailservice.js`:
```js
this.maxRetries = 3;
this.baseDelay = 700; // milliseconds
```
* Modify mock provider behavior inside `mockprovider1.js` / `mockprovider2.js`.
* Change rate limit in `limit.js`:

```js
new RateLimiter(5, 10000); // 5 emails per 10 seconds
```

### Screenshot
<img width="1473" height="943" alt="image" src="https://github.com/user-attachments/assets/c61ce1ca-6b4a-49fa-92e2-0ca37efabdcf" />

### 📡 API Endpoint

1. GET `/logs`:-Returns JSON of all sent emails and logs.
<img width="490" height="418" alt="image" src="https://github.com/user-attachments/assets/dacf550e-254e-4aba-94f7-0b4055284b12" />



### 🛠️ Built With

* Node.js
* Express.js
* Vanilla JS, HTML, CSS

### 🧑‍💻 Author
Built by Arushi Nirala.


 
