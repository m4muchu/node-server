const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; // either selecting heroku port or local host port woking in both enviorment
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');  //key value pair for setting middleware
app.use(express.static(__dirname + '/public')); // adding middleware to the app __dirname is in built to react the root of the file
                                                 // this will provide the routing of app

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {      // it is used to define a funtion and used in hbs
    return text.toUpperCase();
});

app.use((req, res, next) => {       // it will execute after a middle ware executed, it is also to be used to execte next middle ware
    var now = new Date().toString();
    var log = `${now}: ${req.method}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('unable to apped server log');
        }
    })

    next(); // it is used to move next middleware
});

// app.use((req, res, next) => {       // here it will be by pass all other, it will used when site is under maintenance
//     res.render('maintenance.hbs');  //here we wont use next to invoke the other middle ware
// })
                                   
app.get('/', (req, res) => {
  res.render('home.hbs',{
      pageTitle: 'Welcome page',
      welcomeMessage: 'Welcome to react world'
  })
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'ABOUT THIS!'
    });
});

app.get('/profile', (req, res) => {
    res.render('profile.hbs', {
        pageTitle: 'profile page',
        welcomeMessage: 'hiii every one'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});