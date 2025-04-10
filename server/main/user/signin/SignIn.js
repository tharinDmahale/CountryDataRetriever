"use strict";

const DAO = require("../DAO");
const AuthUtil = require("../../auth/AuthUtil");
const UserUtil = require("../UserUtil");
const Response = require("../../common/Response.json");

class SignIn {
    static getPath() {
        return "/SignIn";
    }

    static async getBody(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            if (!username || !password) {
                Response.data = {
                    error: "Username and password are required!"
                }

                res.status(400).json(Response);

            } else {
                if (await DAO.hasUser(username)) {
                    const user = (await DAO.getUserByName(username));

                    if (UserUtil.comparePassword(password, user.userpassword)) {
                        const token = (await AuthUtil.createAccessToken(user));
                        Response.data = {
                            token: token,
                            message: `User '${user.username}' signed in successfully!`
                        }

                        res.status(200).json(Response);

                    } else {
                        Response.data = {
                            error: "Invalid password!"
                        }

                        res.status(401).json(Response);
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

module.exports = SignIn;