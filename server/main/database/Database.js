"use strict";

const DatabaseUtil = require("./DatabaseUtil");

class Database {
    static async write(query) {
        try {
            await DatabaseUtil.connect();
            await DatabaseUtil.insert(query);
            await DatabaseUtil.disconnect();

        } catch (err) {
            console.error("Error writing to database! ", err);
            throw err;
        }
    }

    static async read(query) {
        let result = null;

        try {
            await DatabaseUtil.connect();
            result = (await DatabaseUtil.extract(query));
            await DatabaseUtil.disconnect();

        } catch (err) {
            console.error("Error reading from database! ", err);
            throw err;
        }

        return result;
    }
}

module.exports = Database;