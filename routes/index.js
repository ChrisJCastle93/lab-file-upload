const router = require("express").Router();
const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const fileUploader = require("../config/cloudinary.config");

/* GET home page */
router.get("/", (req, res, next) => {
  Post.find().populate('creatorId').then((response) => {
    console.log(response)
    const posts = response;
    res.render("index", { posts });
  });
});

/* GET home page */
router.get("/:id", (req, res, next) => {
  const { id } = req.params
  Post.findById(id).populate('creatorId').then((response) => {
    console.log(response)
    const post = response;
    res.render("post", { post });
  });
});

router.get("/new", (req, res, next) => {
  res.render("newpost");
});

router.post("/posts/new", fileUploader.single("blogpic"), (req, res, next) => {
  const { content, picName } = req.body;
  const creatorId = req.session.currentUser
  console.log(creatorId)
  Post.create({
    content: content,
    picName: picName,
    creatorId: creatorId,
    picPath: req.file.path,
  })
    .then((postFromDB) => {
      console.log("Newly created post is: ", postFromDB);
      res.redirect("/");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("/posts/new", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("posts/new", {
          errorMessage:
            "Username and email need to be unique. Either username or email is already used.",
        });
      } else {
        next(error);
      }
    }); // close .catch()
});

module.exports = router;
