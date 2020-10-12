const connection = require("../config/db");

module.exports = {
    getOrder: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT history.invoice as invoices, 'User' as user, history.date as dates, GROUP_CONCAT(product.name) as names, history.subtotal as subtotals from history LEFT JOIN order on order.id_history = history.id LEFT JOIN product on product.id = order.id_product GROUP BY(invoice)", (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, today_income: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT SUM(subtotal) as subtotals FROM history WHERE DATE_FORMAT(date, "%Y-%m-%d") = CURRENT_DATE()`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, total_order: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT COUNT(*) as totals from order", (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, total_yearIncome: (this_year) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT SUM(subtotal) AS subtotals FROM history WHERE YEAR(date) >= YEAR${"('" + this_year + "')"}`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, this_month: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT DATE(date) as dates, sum(subtotal) as subtotals FROM history WHERE MONTH(date) = MONTH(NOW()) AND YEAR(date) = YEAR(NOW()) GROUP BY DATE(date)", (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, last_month: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT DATE(date) as dates, sum(subtotal) as subtotals FROM history WHERE MONTH(date) = MONTH(NOW() -INTERVAL "1" MONTH) AND YEAR(date) = YEAR(NOW()) GROUP BY DATE(date)', (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, getOrderpostOrder: (dataOrder) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO order SET '${dataOrder}'`,  (error, result) => {
                if (!error) {
                    const newResult = {
                        product_id: result.insertId,
                        ...dataOrder
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}
