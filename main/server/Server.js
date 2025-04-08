"use strict";

const express = require("express");
const ServerConfig = require("./ServerConfig");

class Server {
    static start() {
        const app = express();
        app.listen(ServerConfig.getPort(), () => {
            console.log(`APP : SERVE http://${ServerConfig.getHost()}:${ServerConfig.getPort()} - ${new Date()}`);
        });
    }
}

module.exports = Server;