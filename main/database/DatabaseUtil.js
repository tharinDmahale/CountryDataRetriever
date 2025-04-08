"use strict";

const sqlite3 = require("sqlite3");
const DatabaseConfig = require("./DatabaseConfig");

class DatabaseUtil {
    static #db = sqlite3.verbose();
    static #connection;

    static connect() {
        this.#connection = new this.#db.Database(`./${DatabaseConfig.getName()}.db`, (err) => {
            if (err) {
                console.error("Error connecting to database! ", err);
                throw err;
            }
        });        
    }

    static insert(query) {
        this.#connection.run(query, (err) => {
            if (err) {
                console.error("Error inserting data! ", err);
                throw err;
            }
        });
    }

    static extract(query) {
        let result = null;

        this.#connection.all(query, [], (err, rows) => {
            if (err) {
                console.error("Error extracting data! ", err);
                throw err;
            } else {
                result = rows;
            }
        });

        return result;
    }

    static disconnect() {
        this.#connection.close((err) => {
            if (err) {
                console.error("Error closing database connection! ", err);
                throw err;
            }
        });
    }
}

module.exports = DatabaseUtil;