const { user_get, user_get_id, user_edit, user_delete } = require("../model/account")
const bcrypt = require('bcrypt')
const helper = require("../helper/index.js")
const redis = require('redis')
const client = redis.createClient(6379, process.env.REDIS_HOST)

module.exports = {
    user_get: async (request, response) => {
        try {
            const result = await user_get();
            client.setex(`user_get`, 3600, JSON.stringify(result))
            return helper.response(response, 200, "Get Account Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
    }, user_get_id: async (request, response) => {
        try {
            const { id } = request.params
            const result = await user_get_id(id)
            if (result.length > 0) {
                return helper.response(response, 200, "Get Account by ID Success", result);
            } else {
                return helper.response(response, 404, "Bad request");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
    }, user_edit: async (request, response) => {
        try {
            const { id } = request.params
            const { name, email, password, status, role_id } = request.body
            const salt = bcrypt.genSaltSync(10)
            const encrypt_password = bcrypt.hashSync(password, salt)
            const setData = {
                name,
                email,
                password: encrypt_password,
                role_id,
                status,
                updated: new Date()
            }
            check_user = await user_get_id(id)
            if (setData.name === '') {
                return helper.response(response, 400, "Name cannot be empty");
            } else if (setData.email === '') {
                return helper.response(response, 400, "Email cannot be empty");
            } else if (password < 8) {
                return helper.response(response, 400, "Password must be up 8 character");
            }
            if (check_user.length > 0) {
                const result = await user_edit(setData, id)
                return helper.response(response, 200, "Update User Success", result);
            } else {
                return helper.response(response, 404, "Bad Request");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, user_delete: async (request, response) => {
        try {
            const { id } = request.params
            const result = await user_delete(id)
            response.send("Delete Category Success")
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }
}
