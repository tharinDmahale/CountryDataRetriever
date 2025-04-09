"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const Database = require("../../database/Database");
const Response = require("../../common/Response.json");

class SignUp {
    static getPath() {
        Response.route = "SignUp";
        Response.path = "/SignUp";
        return Response.path;
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
                const results = (await Database.read(`SELECT * FROM users WHERE username='${username}'`));

                if (results.length > 0) {
                    Response.data = {
                        error: "User already exists!"
                    }

                    res.status(409).json(Response);

                } else {
                    const id = uuidv4();
                    const hashedPassword = bcrypt.hashSync(password, 10);

                    await Database.write("CREATE TABLE IF NOT EXISTS users (userid TEXT PRIMARY KEY, username TEXT UNIQUE, userpassword TEXT)");
                    await Database.write(`INSERT INTO users (userid, username, userpassword) VALUES ('${id}', '${username}', '${hashedPassword}')`);

                    const user = ((await Database.read(`SELECT * FROM users WHERE userid='${id}'`))[0]);

                    if (!user) {
                        Response.data = {
                            error: "User creation failed!"
                        }

                        res.status(500).json(Response);

                    } else {
                        Response.data = {
                            id: id,
                            username: username,
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