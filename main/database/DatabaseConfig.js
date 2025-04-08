"use strict";

const DatabaseInfo = require("./DatabaseInfo.json");

class DatabaseConfig {
    static getName() {
        return DatabaseInfo.name;
    }
}

module.exports = DatabaseConfig;