"use strict";

const Database = require("../database/Database");

class DAO {
    static async createToken(tokenid, tokencontent, userid) {
        //await Database.write(`CREATE TABLE IF NOT EXISTS tokens (tokenid TEXT PRIMARY KEY, tokencontent TEXT NOT NULL, userid TEXT NOT NULL, FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE)`);
        await Database.write(`INSERT INTO tokens (tokenid, tokencontent, userid) VALUES ('${tokenid}', '${tokencontent}', '${userid}')`);
    }

    static async getTokenById(tokenid) {
        return ((await Database.read(`SELECT * FROM tokens WHERE tokenid='${tokenid}'`))[0]);
    }

    static async userHasToken(userid) {
        const tokens = (await Database.read(`SELECT * FROM tokens WHERE userid='${userid}'`));
        return (tokens.length > 0);
    }

    static async getTokenByUserId(userid) {
        return ((await Database.read(`SELECT * FROM tokens WHERE userid='${userid}'`))[0]);
    }

    static async hasToken(tokenid) {
        const tokens = (await Database.read(`SELECT * FROM tokens WHERE tokenid='${tokenid}'`));
        return (tokens.length > 0);
    }

    static async deleteToken(userid) {
        await Database.write(`DELETE FROM tokens WHERE userid='${userid}'`);
    }
}

module.exports = DAO;