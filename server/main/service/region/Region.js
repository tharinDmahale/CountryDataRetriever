"use strict";

const ServiceUtil = require("../ServiceUtil");
const Response = require("../../common/Response.json");

class Region {
    static getPath() {
        return "/Region/:regionvalue";
    }

    static async getBody(req, res) {
        try {
            const regionvalue = req.params.regionvalue;
            const data = (await ServiceUtil.getData("region", regionvalue));

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

module.exports = Region;