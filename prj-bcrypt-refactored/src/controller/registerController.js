const bcrypt = require("bcrypt");
const UserRepository = require('../database/repositories/userRepository');
const session = require('express-session');
const flash = require('express-flash');

const HAS_EMAIL = { message: "Email já existe" };
const CREATE_USER = "Registrado com sucesso! Por favor logue...";

exports.checkRegister = async (req, res) => {

    this.repository = new UserRepository();

    let user = { name, email, password, password2 } = req.body;



    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ message: 'Por favor preencha todos os campos' });
    }

    if (password.length < 6) {
        errors.push({ message: 'Password necessita pelo menos 6 caracteres' });
    }

    if (password != password2) {
        errors.push({ message: 'Passwords não coincidem' });
    }

    if (errors.length > 0) {
        res.render('../src/view/register', { errors });
    } else {

        let hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;


        let texto;
        //chamar função para salvar no bd
        try {
            texto = await this.repository.create(user);
        } catch (err) {
            console.log(err);
        }

        if (texto == 1) {

            errors.push(HAS_EMAIL);
            res.render('../src/view/register', { errors });
        } else if (texto == 2) {

            req.flash("success_msg", CREATE_USER);
            res.redirect("/user/login");
        }
    }



}
