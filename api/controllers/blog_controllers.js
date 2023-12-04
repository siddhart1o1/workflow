const BlogSchema = require("../models/blog_model");

const add_blog = async (req, res) => {
  try {
    const { form, option } = req.body;
    const { title, content } = { ...form };
    const newBlog = await BlogSchema.create({
      title: title,
      content: content,
      category: option,
      author: req.user.email,
      by: req.user.role,
    });
    res.json({ message: "Blog created" });
  } catch (error) {
    console.log(error);
  }
};
const get_all = async (req, res) => {
  try {
    const { by, category, sort } = req.query;
    let sortObj = {};
    if (sort === "Newest") {
      sortObj = { date: -1 };
    } else if (sort === "Most Likes") {
      sortObj = { likes: -1 };
    }
    const query = {};

    if (by) {
      query.by = { $in: by.split(",") };
    }

    if (category) {
      query.category = { $in: category.split(",") };
    }
    const blogs = await BlogSchema.find(query).sort(sortObj);

    res.json(blogs);
  } catch (error) {
    console.log(error);
  }
};
const like = async (req, res) => {
  try {
    const { blog_id } = req.body;
    const userId = req.user.id;
    console.log(userId);
    const blog = await BlogSchema.findById({ _id: blog_id });
    const alreadyLikedIndex = blog.likes.indexOf(userId);
    if (alreadyLikedIndex === -1) {
      blog.likes.push(userId);
    } else {
      blog.likes.splice(alreadyLikedIndex, 1);
    }
    await blog.save();
    res.json("Blog like status updated");
  } catch (err) {
    res.json({ error: err.message });
  }
};
const delete_blog = async (req, res) => {
  try {
    const { blog_id } = req.body;
    const email = req.user.email;
    console.log(blog_id, email);
    const blog = await BlogSchema.findById({ _id: blog_id });
    if (blog.author === email) {
      const deleted = await BlogSchema.findByIdAndDelete({ _id: blog_id });
    }
    res.json("Blog deleted");
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = {
  add_blog,
  get_all,
  like,
  delete_blog,
};
