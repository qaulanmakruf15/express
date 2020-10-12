const { getHistory } = require("../model/history")
const helper = require("../helper/index.js")

module.exports = {
    getHistory: async (request, response) => {
        try {
            if (request.query.orderYear === "yes") {
                requests = "year"
                years = new Date().getFullYear() + "-" + "01" + "-" + "01";
                const result = await getHistory(years, requests);
                return helper.response(response, 200, "Get History Success", result);
            } else if (request.query.orderMonth === "yes") {
                requests = "month"
                months = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + "01";
                const result = await getHistory(months, requests);
                return helper.response(response, 200, "Get History Success", result);
            } else if (request.query.orderDay === "yes") {
                requests = "day"
                days = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate().toString().padStart(2, "0");
                const result = await getHistory(days, requests);
                return helper.response(response, 200, "Get History Success", result);
            } else {
                requests = "monthir"
                month = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + "01";
                const result = await getHistory(month, requests);
                return helper.response(response, 200, "Get History Success", result);
            }
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
    }
}
