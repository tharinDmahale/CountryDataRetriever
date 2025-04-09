"use strict";

const bcrypt = require("bcrypt");

class UserUtil {
    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    static comparePassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}

module.exports = UserUtil;