const { postOrder, today_income, total_order, total_yearIncome, this_month, last_month, getOrder } = require("../model/order")
const { postHistory } = require("../model/history")
const helper = require("../helper/index.js")

module.exports = {

    getOrder: async (request, response) => {
        try {
            const result = await getOrder();
            return helper.response(response, 200, "Get Order Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
    }, today_income: async (request, response) => {
        try {
            const result = await today_income();
            return helper.response(response, 200, "Get Order Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
    }, total_order: async (request, response) => {
        try {
            const result = await total_order();
            return helper.response(response, 200, "Get Order Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
    }, total_yearIncome: async (request, response) => {
        try {
            const dates = new Date()
            const thisYear = dates.getFullYear() + "-01-01";
            const result = await total_yearIncome(thisYear);
            return helper.response(response, 200, "Get Order Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
    }, this_month: async (request, response) => {
        try {
            const result = await this_month();
            return helper.response(response, 200, "Get Order Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
    }, last_month: async (request, response) => {
        try {
            const result = await last_month();
            return helper.response(response, 200, "Get Order Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
    }, postOrder: async (request, response) => {
        try {
            let dataPostman = request.body.orders
            Array.prototype.sum = function (prop) { var total = 0; for (var i = 0, _len = this.length; i < _len; i++) { total += this[i][prop] } return total }

            let dataHistory = {
                invoice: "1234",
                subtotal: (dataPostman.sum("price")) + (dataPostman.sum("ppn")),
                date: new Date()
            }
            const resultHistory = await postHistory(dataHistory)
            const history_id = (resultHistory.product_id)

            for (let i = 0; i < dataPostman.length; i++) {
                let dataOrder = {
                    id_product: dataPostman[i].product_id,
                    id_history: history_id,
                    qty: dataPostman[i].qty,
                    price: dataPostman[i].price,
                    ppn: dataPostman[i].price * 5 / 100
                }
                await postOrder(dataOrder)
            }
            return helper.response(response, 201, "Create Order Success", resultHistory);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }

}
