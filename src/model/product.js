const connection = require("../config/db");

module.exports = {
    getProduct: (sort) => {
        return new Promise((resolve, reject) => {
            // connection.query(`SELECT * FROM product ORDER BY id ASC`, (error, result) => {
            connection.query(`SELECT product.id as id, category.name as category_name, category.id as category_id, product.name as name, product.image as image, product.price as price, product.created as created, product.updated, product.status FROM product INNER JOIN category on product.id_category = category.id ORDER BY ${sort}`, (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            });
        })
    },
    searchProduct: (search) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product WHERE name LIKE '${search}'`, (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            });
        })
    },
    getProductOrderName: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product ORDER BY name`, (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            });
        })
    },
    getProductOrderCategory: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product ORDER BY id_category`, (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            });
        })
    },
    getProductOrderDate: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product ORDER BY created ASC`, (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            });
        })
    },
    getProductOrderPrice: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product ORDER BY price ASC`, (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            });
        })
    },
    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product WHERE id = ${id}`, (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            })
        })
    },
    postProduct: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO public.product(id_category, name, image, price, created, status) VALUES (${setData.id_category},'${setData.name}', '${setData.image}', ${setData.price}, '${setData.created}', ${setData.status})`, (error, result) => {
                if (!error) {
                    const newResult = {
                        ...setData
                    }
                    resolve(newResult.rows)
                } else {
                        console.log(error)
                        reject(new Error(error)) 
                }
            })
        })
    },
    patchProduct: (setData, id) => {
        return new Promise((resolve, reject) => {
               connection.query(`UPDATE public.product SET name='${setData.name}', image='${setData.image}', price=${setData.price}, id_category=${setData.id_category}, updated='${setData.updated}', status=${setdData.status} WHERE id = ${id};`, (error, result) => {
                if (!error) {
                    const newResult = {
                        product_id: id,
                        ...setData
                    }
                    resolve(newResult.rows)
                } else {
                    console.log(error)
                    reject(new Error(error)) 
            }
            })
        })
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM product WHERE id = ${id}`, (error, result) => {
                if (!error) {
                    const newResult = {
                        id: id
                    }
                    resolve(newResult.rows)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}