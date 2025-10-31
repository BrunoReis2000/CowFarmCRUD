// import
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;

//connect do mongodb database
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//middlewares -  software that acts as a bridge between an operating system or database and applications, especially on a network.
//What is Middleware? It is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//esconder o secret no .env e meter o .env no .gitignore
app.use(session({
    secret: 'your_secret_key',
    saveUninitialized: true,
    resave: false
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});


//set template engine - allows to use dynamic HTML pages with embeded js directly in html
app.set('view engine', 'ejs');

//route prefixes
app.use("", require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});