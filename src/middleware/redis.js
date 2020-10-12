const redis = require('redis')
const client = redis.createClient(6379, process.env.REDIS_HOST)
const helper = require('../helper/index')
const { request, response } = require('express')

module.exports = {
    getProductRedis: (request, response, next) => {
        client.get(`getProduct`, (error, result) => {
            if (!error && result != null) {
                return helper.response(response, 200, JSON.parse(result))
            } else {
                next()
            }
        })
    },getCategoryRedis: (request, response, next) => {
        client.get(`getCategory`, (error, result) => {
            if (!error && result != null) {
                return helper.response(response, 200, JSON.parse(result))
            } else {
                next()
            }
        })
    }, 
    clearDataProductRedis: (request, response, next) => {
        client.keys("getProduct*", (err, keys) => {
            if (keys.length > 0) {
                keys.forEach((value) => {
                    client.del(value)
                })
            }
            next()
        })
    }, clearDataCategoryRedis: (request, response, next) => {
        client.keys("getCategory*", (err, keys) => {
            if (keys.length > 0) {
                keys.forEach((value) => {
                    client.del(value)
                })
            }
            next()
        })
    }
}