// import
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 3000;  // Fly will always provide PORT in env
const HOST = "0.0.0.0";                 // Must bind to 0.0.0.0, not localhost

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

//connect do mongodb database
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//middlewares -  software that acts as a bridge between an operating system or database and applications, especially on a network.
//What is Middleware? It is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const basicAuth = require('express-basic-auth');

app.use(basicAuth({
    users: { [process.env.USER]: process.env.PASSWORD }, // shared credentials
    challenge: true, // shows browser login popup
    realm: "CowManager"
}));

const path = require('path');
app.use(express.static(path.resolve('components')));
app.use('/favicons', express.static(path.join(__dirname, 'components/favicons')));
console.log("Project root:", __dirname);

//esconder o secret no .env e meter o .env no .gitignore
app.use(session({
    secret: process.env.SECRET || 'fallback_secret',
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: false, // Render free tier does NOT require HTTPS inside the container
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    next();
});


app.use(express.static("uploads"));

//set template engine - allows to use dynamic HTML pages with embeded js directly in html
app.set('view engine', 'ejs');

//route prefixes
app.use("", require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});