// Import
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const basicAuth = require('express-basic-auth');
const path = require('path');

const app = express();

// -------------------------
// Server config
// -------------------------
const PORT = process.env.PORT || 3000;  // Fly provides PORT
const HOST = "0.0.0.0";                 // Must bind to 0.0.0.0 on Fly

// -------------------------
// MongoDB connection
// -------------------------
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // fast fail if unreachable
});

const db = mongoose.connection;
db.on('error', (err) => console.error("MongoDB connection error:", err));
db.once('open', () => console.log("Connected to MongoDB"));

// -------------------------
// Middleware
// -------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic Auth (optional)
if (process.env.USER && process.env.PASSWORD) {
    app.use(basicAuth({
        users: { [process.env.USER]: process.env.PASSWORD },
        challenge: true,
        realm: "CowManager"
    }));
}

// Static files
app.use(express.static(path.resolve('components')));
app.use('/favicons', express.static(path.join(__dirname, 'components/favicons')));
app.use(express.static("uploads")); // optional, only if volume mounted

// Session
app.use(session({
    secret: process.env.SECRET || 'fallback_secret',
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: false,  // HTTPS not required inside Fly container
        maxAge: 1000 * 60 * 60 * 24  // 1 day
    }
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    next();
});

// -------------------------
// Template engine
// -------------------------
app.set('view engine', 'ejs');
if (process.env.NODE_ENV === "production") app.set("view cache", true);

// -------------------------
// Routes
// -------------------------
app.use("", require('./routes/routes'));

// -------------------------
// Start server (only once)
// -------------------------
app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
