"use strict";

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const AuthConfig = require("./AuthConfig");
const DAO = require("./DAO");

class AuthUtil {
    static async createAccessToken(user) {
        const tokenid = uuidv4();
        const token = jwt.sign({tokenid: tokenid, userid: user.userid}, AuthConfig.getAccessTokenSecret());
        await DAO.createToken(tokenid, token, user.userid);
        return (await DAO.getToken(tokenid));
    }

    static async verifyAccessToken(token) {
        let verified;

        try {
            const decoded = jwt.verify(token, AuthConfig.getAccessTokenSecret());

            if (!decoded) {
                verified = false;

            } else {
                const dbToken = (await DAO.hasToken(decoded.tokenid));

                if (await DAO.hasToken(decoded.id)) {
                    verified = true;

                } else {
                    verified = false;
                }
            }

        } catch (err) {
            verified = false;
        }

        return verified;
    }
}

module.exports = AuthUtil;