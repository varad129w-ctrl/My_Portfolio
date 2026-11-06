const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.get('/resume', (req, res) => {
  res.sendFile(path.join(__dirname, "FINALCV.pdf"));
});

app.get('/FINALCV.pdf', (req, res) => {
  res.sendFile(path.join(__dirname, "FINALCV.pdf"));
});

app.get('/bio', (req, res) => {
  res.redirect('/#about');
});

// Optional contact API endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(`[Contact Form Submission] From: ${name} (${email}) | Subject: ${subject}`);
  console.log(`Message: ${message}`);
  res.json({ success: true, message: "Thank you! Your message has been received." });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
