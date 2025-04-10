"use strict";

const AuthInfo = require("./AuthInfo.json");

class AuthConfig {
    static getAccessTokenSecret() {
        return AuthInfo.accessTokenSecret;
    }
}

module.exports = AuthConfig;