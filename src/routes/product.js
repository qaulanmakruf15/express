const router = require("express").Router()
const { getAllProduct, searchProduct, getProductOrderName, getProductOrderCategory, getProductOrderDate, getProductOrderPrice, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')
const { auth, permission } = require('../middleware/auth')
const { getProductRedis, clearDataProductRedis } = require('../middleware/redis')
const uploadImage = require('../middleware/multer')

router.get("/", getProductRedis, getAllProduct);
router.get("/search", auth, searchProduct);
router.get("/ordername", auth, getProductOrderName);
router.get("/ordercategory", auth, getProductOrderCategory);
router.get("/orderdate", auth, getProductOrderDate);
router.get("/orderprice", auth, getProductOrderPrice);
router.get("/:id", auth, getProductById);
router.post("/", permission, auth, uploadImage, clearDataProductRedis, postProduct);
router.patch("/:id", permission, auth, uploadImage, clearDataProductRedis, patchProduct);
router.delete("/:id", permission, auth,  clearDataProductRedis, deleteProduct);

module.exports = router