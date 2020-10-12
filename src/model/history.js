const connection = require("../config/db");
const { request } = require("express");

module.exports = {
    getHistory: (dates, requests) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM history WHERE date >= ${dates}`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, postHistory: (dataHistory) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO history SET ${dataHistory}", (error, result) => {
                if (!error) {
                    const newResult = {
                        product_id: result.insertId,
                        ...dataHistory
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}
