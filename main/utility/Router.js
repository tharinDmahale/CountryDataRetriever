"use strict";

//const About = require("../service/about/About");
const Region = require("../service/region/Region");
const Country = require("../service/country/Country");
const Currency = require("../service/currency/Currency");
const Capital = require("../service/capital/Capital");
const Language = require("../service/language/Language");
const Flag = require("../service/flag/Flag");

class Router {
    static getRoutes(app) {
        //app.get(About.getPath(), About.getBody);
        app.get(Region.getPath(), Region.getBody);
        app.get(Country.getPath(), Country.getBody);
        app.get(Currency.getPath(), Currency.getBody);
        app.get(Capital.getPath(), Capital.getBody);
        app.get(Language.getPath(), Language.getBody);
        app.get(Flag.getPath(), Flag.getBody);
    }
}

module.exports = Router;