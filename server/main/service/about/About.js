"use strict";

const Response = require("../../common/Response.json");

class About {
    static getPath() {
        return "/";
    }

    static getBody(req, res) {
        try {
            Response.data = {
                message: "This is the About page!"
            }

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