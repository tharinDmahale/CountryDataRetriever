"use strict";

const ServerInfo = require("./ServerInfo.json");

class ServerConfig {
    static getHost() {
        return ServerInfo.host
    }

    static getPort() {
        return ServerInfo.port
    }
}

module.exports = ServerConfig;