const { getCategory, getCategoryById, postCategory, patchCategory, deleteCategory } = require("../model/category")
const helper = require("../helper/index.js")
const redis = require('redis')
const client = redis.createClient(6379, process.env.REDIS_HOST)

module.exports = {

    getCategory: async (request, response) => {
        try {
            const result = await getCategory();
            client.setex(`getCategory`, 3600, JSON.stringify(result))
            return helper.response(response, 200, "Get Category Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
        
    }, getCategoryById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getCategoryById(id)
            if (result.length > 0) {
                return helper.response(response, 200, "Get Category by ID Success", result);
            } else {
                return helper.response(response, 404, "Bad request");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
    }, postCategory: async (request, response) => {
        try {
            const setData = { name: request.body.name }
            const result = await postCategory(setData)
            return helper.response(response, 201, "Create Category Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, patchCategory: async (request, response) => {
        try {
            const { id } = request.params
            const setData = { name: request.body.name }
            const checkId = await getCategoryById(id)
            if (checkId.length > 0) {
                const result = await patchCategory(setData, id)
                return helper.response(response, 200, "Update Category Success", result);
            } else {
                return helper.response(response, 404, "Bad Request");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, deleteCategory: async (request, response) => {
        try {
            const { id } = request.params
            const result = await deleteCategory(id)
            // response.send("Delete Category Success")
            return helper.response(response, 201, 'Delete Product Success ', result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }

}
