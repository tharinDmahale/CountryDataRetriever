"use strict";

const Server = require("./server/Server");

class Main {
    static main() {
        Server.start();
    }
}

module.exports = Main;