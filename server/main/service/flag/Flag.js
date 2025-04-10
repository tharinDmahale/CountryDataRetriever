"use strict";

const ServiceUtil = require("../ServiceUtil");
const Response = require("../../common/Response.json");

class Flag {
    static getPath() {
        return "/Flag/:countryvalue";
    }

    static async getBody(req, res) {
        try {
            const countryvalue = req.params.countryvalue;
            const data = (await ServiceUtil.getFlagData(countryvalue));

            Response.data = data;

            res.status(200).json(Response);

        } catch (err) {
            if (err.response) {
                Response.data = {
                    error: "Invalid parameter value!"
                }

                res.status(err.response.status).json(Response);
                
            } else {
                Response.data = {
                    error: "Something went wrong!"
                }

                res.status(500).json(Response);
            }
        }
    }
}

module.exports = Flag;