"use strict";

const AuthUtil = require("./AuthUtil");
const Response = require("../common/Response.json");

class Auth {
    static async authenticate(req, res, next) {
        try {
            const auth = req.header("authorization");

            if (!auth) {
                Response.data = {
                    error: "Access token is missing!"
                }

                res.status(401).send(Response);

            } else {
                const tokencontent = auth.split(" ")[1];
                const verified = await AuthUtil.verifyAccessToken(tokencontent);

                if (!verified) {
                    Response.data = {
                        error: "Invalid access token!"
                    }
                    
                    res.status(401).send(Response);
                    
                } else {
                    next();
                }
            }

        } catch (err) {
            res.status(500).send("Something went wrong!");
        }
    }
}

module.exports = Auth;