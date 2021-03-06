const express = require("express");

const bodyParser = require("body-parser");

const blogData = require("./blogData.js");
const ejs = require("ejs");

const app = express();

const date = new Date();

const blogPosts = blogData(date);

console.log(blogPosts[0].heading);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

var blogNumber = 0;

app.get("/", function (req, res) {
  let newPost = {
    heading: "Work from home",
    date: blogPosts[0].date,
    paragraph: blogPosts[0].paragraph,
  };

  blogPosts.push(newPost);

  res.render("pages/blog", { blogPosts: blogPosts });
});

app.get("/about", function (req, res) {
  res.render("pages/about");
});

app.get("/contact", function (req, res) {
  res.render("pages/contact");
});

app.get("/read-blog", function (req, res) {
  const selectedBlog = blogPosts[blogNumber];
  console.log(selectedBlog);
  res.render("pages/read-blog", {
    selectedBlog: selectedBlog,
  });
});

app.post("/read-blog", function (req, res) {
  const blogId = req.body.blogId;
  blogNumber = blogId;
  res.redirect("/read-blog");
});

app.listen(3000, function () {
  console.log("server listening on: http://www.localhost:3000");
});
