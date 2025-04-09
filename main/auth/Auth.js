"use strict";

const AuthUtil = require("./AuthUtil");

class Auth {
    static async authenticate(req, res, next) {
        try {
            const auth = req.header("authorization");

            if (!auth) {
                res.status(401).send("Access token is missing!");

            } else {
                const tokencontent = auth.split(" ")[1];
                const verified = await AuthUtil.verifyAccessToken(tokencontent);

                if (!verified) {
                    res.status(401).send("Invalid access token!");
                    
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