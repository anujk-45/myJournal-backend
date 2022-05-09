const Blog = require("../models/blog");

const incViews = async(req, res, next) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    const updatedBlog = { views: blog.views + 1 };
    await blog.updateOne(updatedBlog);
    next();
  } catch (e) {
    // console.log(e);
    res.status(401).send({error: 'User Not Found'})
  }
}

module.exports = incViews;