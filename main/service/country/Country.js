"use strict";

const ServiceUtil = require("../ServiceUtil");
const Response = require("../../common/Response.json");

class Country {
    static getPath() {
        return "/Country/:countryvalue";
    }

    static async getBody(req, res) {
        try {
            const countryvalue = req.params.countryvalue;
            const data = (await ServiceUtil.getData("name", countryvalue));

            Response.data = data;

            res.status(200).json(Response);

        } catch (err) {
            Response.data = {
                error: "Something went wrong!"
            }

            res.status(500).json(Response);
        }
    }
}

module.exports = Country;