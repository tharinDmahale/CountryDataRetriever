"use strict";

const { v4: uuidv4 } = require("uuid");
const DAO = require("../DAO");
const UserUtil = require("../UserUtil");
const Response = require("../../common/Response.json");

class SignUp {
    static getPath() {
        return "/SignUp";
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
                    Response.data = {
                        error: "User already exists!"
                    }

                    res.status(409).json(Response);

                } else {
                    const id = uuidv4();
                    const hashedPassword = UserUtil.hashPassword(password);
                    await DAO.createUser(id, username, hashedPassword);
                    const user = (await DAO.getUserById(id));

                    if (!user) {
                        Response.data = {
                            error: "User creation failed!"
                        }

                        res.status(500).json(Response);

                    } else {
                        Response.data = {
                            id: user.userid,
                            username: user.username,
                            message: "User created successfully!"
                        }

                        res.status(201).json(Response);
                    }
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

module.exports = SignUp;