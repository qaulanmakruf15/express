const router = require("express").Router()
const { getCategory, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../controller/category')
const { getCategoryRedis, clearDataCategoryRedis } = require('../middleware/redis')
const { auth, permission } = require('../middleware/auth')

router.get("/", getCategoryRedis, getCategory);
router.get("/:id", permission, auth, getCategoryById);
router.post("/", permission, auth, clearDataCategoryRedis, postCategory);
router.patch("/:id", permission, auth, clearDataCategoryRedis, patchCategory);
router.delete("/:id", permission, auth, clearDataCategoryRedis, deleteCategory);

module.exports = router