const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const expressSession = require('express-session');

// declaring a new mongoose app
const app = new express();

// declaring a global variable to confirm if user is logged in
global.loggedIn = null;

// setting app with specific middleware
app.set('view_engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: 'keyboard cat'
}));
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

// not really connecting to a real mongodb database
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser : true});

// setting app to listen on a port
app.listen(8000, () => {
    console.log("App is listening on port 8000");
    console.log("Visit: http://localhost:8000");
});