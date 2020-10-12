const { getProduct, searchProduct, getProductOrderName, getProductOrderCategory, getProductOrderDate, getProductOrderPrice, getProductById, postProduct, patchProduct, deleteProduct } = require("../model/product")
const helper = require("../helper/index.js")
const redis = require('redis')
const client = redis.createClient(6379, process.env.REDIS_HOST)
const fs = require('fs')

module.exports = {
    getAllProduct: async (request, response) => {
        let { sort } = request.query
        if (sort === undefined || sort === "") {
            sort = "id"
        }
        try {
            const result = await getProduct(sort);
            client.setex(`getProduct`, 3600, JSON.stringify(result))
            return helper.response(response, 200, "Get Product Success", result);  
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, searchProduct: async (request, response) => {
        try {
            const { search } = request.query
            const result = await searchProduct(search);
            return helper.response(response, 200, "Search Product Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, getProductOrderName: async (request, response) => {
        try {
            const result = await getProductOrderName();
            return helper.response(response, 200, "Get Product Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, getProductOrderCategory: async (request, response) => {
        try {
            const result = await getProductOrderCategory();
            return helper.response(response, 200, "Get Product Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, getProductOrderDate: async (request, response) => {
        try {
            const result = await getProductOrderDate();
            return helper.response(response, 200, "Get Product Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, getProductOrderPrice: async (request, response) => {
        try {
            const result = await getProductOrderPrice();
            return helper.response(response, 200, "Get Product Success", result);
        } catch (error) {
           return helper.response(response, 400, "Bad Request", error);
        }
    }, getProductById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getProductById(id)
            if (result.length > 0) {
                return helper.response(response, 200, "Get Product by ID Success", result);
            } else {
                return helper.response(response, 404, "Product not found !");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, postProduct: async (request, response) => {
        if (!request.file) {
            return helper.response(response, 400, 'Image required')
        }
        try {
            const setData = {
                id_category: request.body.id_category,
                name: request.body.name,
                image: request.file === undefined ? "no image" : request.file.filename,
                price: request.body.price,
                created: new Date().toISOString(),
                status: request.body.status
            }
            const result = await postProduct(setData)
            return helper.response(response, 201, "Product Created", result);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, patchProduct: async (request, response) => {
        try {
            const { id } = request.params
            const { name, price, id_category, status } = request.body
            const id_product = await getProductById(id)

            const setData = {
                name: name,
                image: !request.file ? id_product[0].image : request.file.filename,
                price: price,
                id_category: id_category,
                updated: new Date().toISOString(),
                status: status
            }

            if (setData.name === '') {
                return helper.response(response, 400, 'Name required')
            } else if (setData.price === '') {
                return helper.response(response, 400, 'Price required')
            } else if (setData.id_category === '') {
                return helper.response(response, 400, 'Category required')
            } else if (setData.status === '') {
                return helper.response(response, 400, 'Status required')
            }

            if (id_product.length > 0) {
                const result = await patchProduct(setData, id)
                return helper.response(response, 200, "Update Product Success", result);
            } else {
                return helper.response(response, 404, "Product not found");
            }
        } catch (error) {
            console.log(error)
            return helper.response(response, 400, "Bad Request", error);
        }
    }, deleteProduct: async (request, response) => {
        try {
            const { id } = request.params
            const id_product = await getProductById(id)
            fs.unlink(`./uploads/${id_product[0].image}`, async (error) => {
                if (error) {
                    throw error
                } else {
                    const result = await deleteProduct(id)
                    return helper.response(response, 201, 'Delete Product Success ', result)
                }
            })
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }
}