const connection = require("../config/db");

module.exports = {

    getCategory: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT id as category_id, name as category_name FROM category", (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            });
        })
    }, getCategoryById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM category WHERE id ${id}`, (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            })
        })
    }, postCategory: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO category SET '${setData}'`, (error, result) => {
                if (!error) {
                    const newResult = {
                        ...setData
                    }
                    resolve(newResult.rows)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }, patchCategory: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE category SET '${setData}' WHERE id = ${id}`, (error, result) => {
                if (!error) {
                    const newResult = {
                        category_id: id
                    }
                    resolve(newResult.rows)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }, deleteCategory: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM category WHERE id = ${id}", (error, result) => {
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
