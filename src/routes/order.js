const router = require("express").Router()
const { postOrder, getOrder, today_income, total_order, total_yearIncome, this_month, last_month } = require('../controller/order');
const { auth } = require('../middleware/auth')

router.post("/", auth, postOrder);
router.get("/", getOrder);
router.get("/today_income", today_income);
router.get("/total_order", total_order);
router.get("/total_yearIncome", total_yearIncome);
router.get("/this_month", this_month);
router.get("/last_month", last_month);

module.exports = router