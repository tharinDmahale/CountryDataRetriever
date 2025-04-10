"use strict";

const ServiceUtil = require("../ServiceUtil");
const Response = require("../../common/Response.json");

class Language {
    static getPath() {
        return "/Language/:langvalue";
    }

    static async getBody(req, res) {
        try {
            const langvalue = req.params.langvalue;
            const data = (await ServiceUtil.getData("lang", langvalue));

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

module.exports = Language;