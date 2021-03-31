const express = require("express");
const path = require('path');
const helmet = require("helmet");
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize');

const messageRoutes = require('./routes/message');
const userRoutes = require('./routes/user');

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(mongoSanitize());
app.use(xss())
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/img', express.static(path.join(__dirname, 'img')));

app.use('/api/messages', messageRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;