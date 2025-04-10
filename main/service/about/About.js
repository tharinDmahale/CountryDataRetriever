"use strict";

const openApiSpec = require("../../../openapi-spec.json");
const Response = require("../../common/Response.json");

class About {
    static getPath() {
        return "/";
    }

    static getBody(req, res) {
        try {
            Response.data = openApiSpec;

            res.status(200).json(Response);

        } catch (err) {
            Response.data = {
                error: "Something went wrong!"
            }

            res.status(500).json(Response);
        }
    }
}

module.exports = About;