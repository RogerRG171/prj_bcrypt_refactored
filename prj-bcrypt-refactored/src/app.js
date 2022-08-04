const express = require("express"); 
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");

const app = express();

const initializePassport = require("./controller/passportController");
initializePassport(passport);

app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
})
);

const index =  require('./route/appRoute');

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', index);




module.exports = app; 