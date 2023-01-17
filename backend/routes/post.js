const express = require("express");
const {createpost, likedUnlikedpost,deletepost} = require("../controllers/post");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated,createpost);

router.route("/post/:id").get(isAuthenticated,likedUnlikedpost).delete(isAuthenticated,deletepost);

module.exports = router;