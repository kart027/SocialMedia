const express = require("express");
const {userregister,login, followUser} = require("../controllers/user");
const { isAuthenticated } = require("../middleware/auth");


const router = express.Router();

router.route("/register").post(userregister);
router.route("/login").post(login);


router.route("/follow/:id").get( isAuthenticated,followUser)

module.exports = router;