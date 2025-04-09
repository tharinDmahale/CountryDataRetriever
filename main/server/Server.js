"use strict";

const express = require("express");
const ServerConfig = require("./ServerConfig");
const Middleware = require("../utility/Middleware");

class Server {
    static start() {
        const app = express();
        Middleware.set(app, express.json());
        app.listen(ServerConfig.getPort(), () => {
            console.log(`APP : SERVE http://${ServerConfig.getHost()}:${ServerConfig.getPort()} - ${new Date()}`);
        });
    }
}

module.exports = Server;