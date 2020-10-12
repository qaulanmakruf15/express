const router = require("express").Router()
const { getHistory } = require('../controller/history')

router.get("/", getHistory);

module.exports = router