const express = require("express"); 
const userController = require('../controller/registerController');
const router = express.Router();
const app = express();

const passport = require("passport");

const session = require("express-session");
const flash = require("express-flash");


router.get('/', (req, res)=>{
    res.render('../src/view/index');
});

router.get('/user/login',checkAuthenticated, (req, res)=>{
    res.render('../src/view/login');
});

router.get('/user/register',checkAuthenticated, (req, res)=>{
    res.render('../src/view/register');
});

router.get('/user/dashboard',checkNotAuthenticated, (req, res)=>{
    res.render('../src/view/dashboard', { user: req.user.name });
});

router.get('/user/logout', (req,res, next) =>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('success_msg', "Você está deslogado");
        res.render('../src/view/login');
    });
});

router.post('/user/register', (req, res)=>{
    userController.checkRegister(req, res);
});

router.post('/user/login', passport.authenticate('local', {
    successRedirect: "/user/dashboard",
    failureRedirect: "/user/login",
    flashRedirect: true
}));

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashboard');
    }
    next();
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
       return next();
    }
     res.redirect('/user/login');
     
}

module.exports = router;