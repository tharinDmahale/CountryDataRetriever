"use strict";

const ServiceUtil = require("../ServiceUtil");
const Response = require("../../common/Response.json");

class Capital {
    static getPath() {
        return "/Capital/:capitalvalue";
    }

    static async getBody(req, res) {
        try {
            const capitalvalue = req.params.capitalvalue;
            const data = (await ServiceUtil.getData("capital", capitalvalue));

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

module.exports = Capital;