"use strict";

const axios = require("axios");

class ServiceUtil {
    static async getData(type, value) {
        try {
            const { data } = (await axios.get(`https://restcountries.com/v3.1/${type}/${value}`));
            return data;

        } catch (err) {
            throw new Error("Failed to fetch data from the API!");
        }
    }

    static async getFlagData(value) {
        try {
            const { data } = (await axios.get(`https://restcountries.com/v3.1/name/${value}?fields=name,flags`));
            return data;

        } catch (err) {
            throw new Error("Failed to fetch data from the API!");
        }
    }
}

module.exports = ServiceUtil;