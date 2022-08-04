const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UserRepository = require('../database/repositories/userRepository');
const app = require("../app");



function initialize(passport) {

    this.repository = new UserRepository();

    console.log('initialized');

    const authenticateUser = async (req, email, password, done) => {
        let userNovo = [];
       
        try {
            userNovo = await this.repository.getByEmail(email);
        } catch (err) {
            console.log(err);
        }

        if (userNovo.length > 0) {
            const user = userNovo[0]; //pega o primeiro elemento da lista
            //compara a senha do navegador com a do banco criptografada
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                if (isMatch) {//caso senha correta retorna o user
                    return done(null, user);
                } else {//caso senha incorreta retorna false e uma msg
                    
                    return done(null, false,req.flash("error","Password incorreto"));
                }
            });
        } else { //caso não encontre o email retorna false e msg
            return done(null, false,req.flash("error", "Email não registrado"));
        }
    };



    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // possibilita o uso de req no primeiro parametro da callback authenticateUser linha 14, com isso da pra fazer req.flash()
    },
        authenticateUser // chama authenticateUser
    ));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {


        const user = await this.repository.getById(id);

        if (user.length > 0) {
                        
            return done(null, user[0]);
        }

    });

}

module.exports = initialize;
