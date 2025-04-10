"use strict";

const axios = require("axios");
const e = require("express");

class ServiceUtil {
    static async getData(type, value) {
        try {
            const { data } = (await axios.get(`https://restcountries.com/v3.1/${type}/${value}`));
            return data;

        } catch (err) {
            throw err;
        }
    }

    static async getFlagData(value) {
        try {
            const { data } = (await axios.get(`https://restcountries.com/v3.1/name/${value}?fields=name,flags`));
            return data;

        } catch (err) {
            throw err;
        }
    }
}

module.exports = ServiceUtil;