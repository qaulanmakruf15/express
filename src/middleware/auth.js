const jwt = require('jsonwebtoken')
const helper = require('../helper')

module.exports = {
    auth: (request, response, next) => {
        let token = request.headers.authorization
        if (token) {
            token = token.split(" ")[1]
            jwt.verify(token, "RAHASIA", (error, result) => {
                if ((error && error.name === "JsonWebTokenError") || (error && error.name === "TokenExpiredError")) {
                    return helper.response(response, 403, error.message)
                } else if (result.status === 0) {
                    return helper.response(response, 403, "Your account has not active. Please Activated")
                } else {
                    request.token = result
                    next()
                }
            })
        } else {
            return helper.response(response, 200, "Please login first")
        }
    },
    permission: (request, response, next) => {
        let token = request.headers.authorization
        if (token) {
            token = token.split(" ")[1]
            jwt.verify(token, "RAHASIA", (error, result) => {
                if ((error && error.name === "JsonWebTokenError") || (error && error.name === "TokenExpiredError")) {
                    return helper.response(response, 403, error.message)
                } else if (result.status === 0) {
                    return helper.response(response, 403, "Your account has not active. Please Activated")
                } else if (result.role_id === 1) {
                    return helper.response(response, 403, "Your do not have permission to access this page")
                } else {
                    request.token = result
                    next()
                }
            })
        } else {
            return helper.response(response, 200, "Please login first")
        }
    }
}
