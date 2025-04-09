"use strict";

const sqlite3 = require("sqlite3");
const DatabaseConfig = require("./DatabaseConfig");

class DatabaseUtil {
    static #db = sqlite3.verbose();
    static #connection;

    static async connect() {
        return new Promise((resolve, reject) => {
            this.#connection = new this.#db.Database(`./${DatabaseConfig.getName()}.db`, (err) => {
                if (err) {
                    console.error("Error connecting to database! ", err);
                    reject(err);

                } else {
                    resolve(null);
                }
            });
        });
    }

    static async insert(query) {
        console.log("SQL : ", query);
        return new Promise((resolve, reject) => {
            this.#connection.run(query, (err) => {
                if (err) {
                    console.error("Error inserting data! ", err);
                    reject(err);

                } else {
                    resolve(null);
                }
            });
        });
    }

    static async extract(query) {
        console.log("SQL : ", query);
        return new Promise((resolve, reject) => {
            this.#connection.all(query, [], (err, rows) => {
                if (err) {
                    console.error("Error extracting data! ", err);
                    reject(err);

                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async disconnect() {
        return new Promise((resolve, reject) => {
            this.#connection.close((err) => {
                if (err) {
                    console.error("Error closing database connection! ", err);
                    reject(err);

                } else {
                    resolve(null);
                }
            });
        });
    }
}

module.exports = DatabaseUtil;