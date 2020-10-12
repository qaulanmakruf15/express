const router = require("express").Router()
const { user_get, user_get_id, user_edit, user_delete } = require('../controller/account');
const { permission } = require('../middleware/auth')

router.get("/", permission, user_get);
router.get("/:id", permission, user_get_id);
router.patch("/:id", permission, user_edit);
router.delete("/:id", permission, user_delete);

module.exports = router