const connection = require('../config/db')

module.exports = {
    user_get: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users", (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            })
        })
    }, user_get_id: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE id = ${id}`, (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            })
        })
    }, user_edit: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE users SET ${setData} WHERE id = ${id}`, (error, result) => {
                if (!error) {
                    const newResult = { 
                        ...setData }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    check_user: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE email = '${email}'`, (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            })
        })
    },
    user_delete: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE * FROM users WHERE id = ${id}`, (error, result) => {
                !error ? resolve(result.rows) : reject(new Error(error))
            })
        })
    }
}