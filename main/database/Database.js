"use strict";

const DatabaseUtil = require("./DatabaseUtil");

class Database {
    static write(query) {
        DatabaseUtil.connect();
        DatabaseUtil.insert(query);
        DatabaseUtil.disconnect();
    }

    static read(query) {
        DatabaseUtil.connect();
        const result = DatabaseUtil.extract(query);
        DatabaseUtil.disconnect();
        return result;
    }
}

module.exports = Database;