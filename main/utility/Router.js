"use strict";

const About = require("../service/about/About");

class Router {
    static getRoutes(app) {
        app.get(About.getPath(), About.getBody);
    }
}

module.exports = Router;