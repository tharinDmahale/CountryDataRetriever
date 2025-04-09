"use strict";

const SignUp = require("../user/signup/SignUp");
const SignIn = require("../user/signin/SignIn");

class Middleware {
    static set(app, json) {
        app.use(json);
        app.use(SignUp.getPath(), SignUp.getBody);
        app.use(SignIn.getPath(), SignIn.getBody);
        app.use((req, res, next) => {
            res.on("finish", () => {
                console.log(`APP : ${req.method} ${req.path} ${res.statusCode} - ${new Date()}`);
            });
            next();
        });
    }
}

module.exports = Middleware;