const db = require('../dbConfig');

class UserRepository {

    async create(userData) {
        
        const conn = await db.connectToMysql();

        const query1 = "SELECT * FROM user WHERE email = ?";
        const query2 = "INSERT INTO user (name, email, password) VALUES (?,?,?) ";

        const [user] = await conn.query(query1, [userData.email]);


        if (user.length > 0 ) {
                        
            return 1; // { message: "Email já existe" };
            
        }else {

            await conn.query(query2, [userData.name, userData.email, userData.password]);

            return 2;//"Registrado com sucesso! Por favor logue...";

        }
    

    }

    async getById(id){

        const conn = await db.connectToMysql();

        const query = "SELECT * FROM user WHERE id = ?";

        const [user] = await conn.query(query, [id]);

        return user;
    }

    async getByEmail(email){

        const conn = await db.connectToMysql();

        const query = "SELECT * FROM user WHERE email = ?";

        const [user] = await conn.query(query, [email]);
       
        return user;
    }

}

module.exports = UserRepository;