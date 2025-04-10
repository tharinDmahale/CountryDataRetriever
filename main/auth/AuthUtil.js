"use strict";

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const AuthConfig = require("./AuthConfig");
const DAO = require("./DAO");

class AuthUtil {
    static async createAccessToken(user) {
        let token;
        const userid = user.userid;

        if (await DAO.userHasToken(userid)) {
            token = (await DAO.getTokenByUserId(userid));

        } else {
            const tokenid = uuidv4();
            const tokencontent = jwt.sign({ tokenid: tokenid, userid: userid }, AuthConfig.getAccessTokenSecret());
            await DAO.createToken(tokenid, tokencontent, userid);
            token = (await DAO.getTokenById(tokenid));
        }

        return token;
    }

    static async verifyAccessToken(tokencontent) {
        let verified;

        try {
            const decoded = jwt.verify(tokencontent, AuthConfig.getAccessTokenSecret());

            if (!decoded) {
                verified = false;

            } else {
                if ((await DAO.hasToken(decoded.tokenid)) && (await DAO.userHasToken(decoded.userid))) {
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

    static async deleteAccessToken(user) {
        const userid = user.userid;

        if (await DAO.userHasToken(userid)) {
            await DAO.deleteToken(userid);
        }
    }
}

module.exports = AuthUtil;