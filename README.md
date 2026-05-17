# Simple Todo + Calculator App

A small Node.js app that serves a beautiful todo list interface with a built-in calculator.

## Features

- Add, complete, and delete todo items
- Perform basic arithmetic using a calculator UI
- Beautiful gradient background with math symbols and glassmorphism styling

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm start
```

3. Open http://localhost:3000 in your browser.

## Deploy to AWS EC2

This app works on EC2 without code changes other than binding to all network interfaces. It already listens on `0.0.0.0`, so the server is accessible from other machines when the port is open.

### Quick EC2 setup

1. Launch an EC2 instance with Amazon Linux, Ubuntu, or another Linux distribution.
2. Open port `3000` in the EC2 instance security group (Inbound rule for TCP 3000).
3. SSH into the instance.
4. Install Node.js and `npm` if needed:

```bash
# Ubuntu example
sudo apt update
sudo apt install -y nodejs npm git
```

5. Clone the repository and install dependencies:

```bash
git clone <your-repo-url> app
cd app
npm install
```

6. Start the app:

```bash
npm start
```

7. Open `http://<EC2-public-ip>:3000` in your browser.

### Notes

- If you want to use a different port, set `PORT` before starting the app, for example `PORT=8080 npm start`.
- For production, you can run the app with a process manager like `pm2` or create a systemd service.
