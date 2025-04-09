"use strict";

const Database = require("../database/Database");

class DAO {
    static async createUser(id, username, hashedPassword) {
        //await Database.write(`CREATE TABLE IF NOT EXISTS users (userid TEXT PRIMARY KEY, username TEXT UNIQUE, userpassword TEXT)`);
        await Database.write(`INSERT INTO users (userid, username, userpassword) VALUES ('${id}', '${username}', '${hashedPassword}')`);
    }

    static async hasUser(username) {
        const users = (await Database.read(`SELECT * FROM users WHERE username='${username}'`));
        return (users.length > 0);
    }

    static async getUserByName(username) {
        return ((await Database.read(`SELECT * FROM users WHERE username='${username}'`))[0]);
    }

    static async getUserById(id) {
        return ((await Database.read(`SELECT * FROM users WHERE userid='${id}'`))[0]);
    }
}

module.exports = DAO;