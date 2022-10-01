const express = require("express");
const router = express.Router();

const { createPost, updatePost, deletePost, getAllPost,   } = require("../controller/post.contorller");
const { isLoggined } = require("../middleware/isLoggined");

router.route("/post/create").post( createPost)

router.route("/post/updatepost/:id").put(isLoggined, updatePost);

router.route("/post/deletepost/:id").delete(isLoggined, deletePost);

router.route("/post/allpost").get(getAllPost);
module.exports = { postRouter: router };
