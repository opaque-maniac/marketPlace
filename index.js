const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

// declaring a new mongoose app
const app = new express();

// setting app with specific middleware
app.set('view_engine', 'ejs');

// not really connecting to a real mongodb database
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser : true});

// setting app to listen on a port
app.listen(8000, () => {
    console.log("App is listening on port 8000");
    console.log("Visit: http://localhost:8000");
});