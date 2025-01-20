// create web server
const express = require('express');
const app = express();
const port = 3000;

// import fs module
const fs = require('fs');

// import path module
const path = require('path');

// import body-parser module
const bodyParser = require('body-parser');

// set module to use body-parser
app.use(bodyParser.urlencoded({extended: false}));

// set module to use public folder
app.use(express.static(path.join(__dirname, 'public')));

// set module to use views folder
app.set('views', path.join(__dirname, 'views'));

// set view engine to ejs
app.set('view engine', 'ejs');

// create a function to read comments from file
const readComments = () => {
    // read file and return comments
    return JSON.parse(fs.readFileSync('comments.json'));
}

// create a function to write comments to file
const writeComments = (comments) => {
    // write comments to file
    fs.writeFileSync('comments.json', JSON.stringify(comments));
}

// create a function to handle get request
app.get('/', (req, res) => {
    // read comments from file
    let comments = readComments();
    // render index.ejs page
    res.render('index', {comments: comments});
});

// create a function to handle post request
app.post('/comment', (req, res) => {
    // read comments from file
    let comments = readComments();
    // create a comment object
    let comment = {
        name: req.body.name,
        message: req.body.message
    }
    // add comment to comments
    comments.push(comment);
    // write comments to file
    writeComments(comments);
    // redirect to home page
    res.redirect('/');
});

// create a function to handle delete request
app.get('/delete/:index', (req, res) => {
    // read comments from file
    let comments = readComments();
    // get index from request parameter
    let index = req.params.index;
    // remove comment from comments
    comments.splice(index, 1);
    // write comments to file
    writeComments(comments);
    // redirect to home page
    res.redirect('/');
});

// listen to port 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 

