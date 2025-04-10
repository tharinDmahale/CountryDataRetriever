"use strict";

const ServiceUtil = require("../ServiceUtil");
const Response = require("../../common/Response.json");

class Currency {
    static getPath() {
        return "/Currency/:currencyvalue";
    }

    static async getBody(req, res) {
        try {
            const currencyvalue = req.params.currencyvalue;
            const data = (await ServiceUtil.getData("currency", currencyvalue));

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

module.exports = Currency;