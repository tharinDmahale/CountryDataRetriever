"use strict";

const DAO = require("../DAO");
const AuthUtil = require("../../auth/AuthUtil");
const Response = require("../../common/Response.json");

class SignOut {
    static getPath() {
        return "/SignOut";
    }

    static async getBody(req, res) {
        try {
            const username = req.body.username;
            const auth = req.header("authorization");

            if (!username || !auth) {
                Response.data = {
                    error: "Username and or authorization header is required!"
                }

                res.status(400).json(Response);

            } else {
                if (await DAO.hasUser(username)) {
                    const user = (await DAO.getUserByName(username));
                    const tokencontent = auth.split(" ")[1];
                    const verified = await AuthUtil.verifyAccessToken(tokencontent);

                    if (!verified) {
                        Response.data = {
                            error: "Invalid token!"
                        }

                        res.status(401).json(Response);

                    } else {
                        await AuthUtil.deleteAccessToken(user);

                        Response.data = {
                            message: `User '${user.username}' signed out successfully!`
                        }

                        res.status(200).json(Response);
                    }

                } else {
                    Response.data = {
                        error: "User does not exist!"
                    }

                    res.status(404).json(Response);
                }
            }

        } catch (err) {
            Response.data = {
                error: "Something went wrong!"
            }

            res.status(500).json(Response);
        }
    }
}

module.exports = SignOut;