const connection = require('../config/db')

module.exports = {
    post_user: (setData) => {
        return new Promise((resolve, reject) => {
            // connection.query(`INSERT INTO users SET '${setData}'`, (error, result) => {
            connection.query(`INSERT INTO users(name, email, password) VALUES ('${setData.name}','${setData.email}','${setData.password}')`, (error, result) => {
                if (!error) {
                    const newResult = {
                        id: result.insertId,
                        ...setData
                    }
                    delete newResult.password
                    resolve(newResult.rows)
                } else {
                    console.log(error)
                    reject(new Error(error))
                }
            })
        })
    }, check_user: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE email = '${email}'`, (error, result) => {
                !error ? resolve(result.rows) : 
                console.log(error)
                reject(new Error(error))
            })
        })
    }
}