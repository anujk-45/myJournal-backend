const express = require('express')
const router = new express.Router()
const cors = require('cors')
const Blog = require('../models/blog')
const incViews = require('../middleware/incViews')
const auth = require('../middleware/auth')

router.get('/', cors(), async(req, res) => {
  try {
    console.log("Inside /blogs/");
    const flag = req.header('flag');
    if(flag === '0'){
      Blog.find({}).sort({views: 'desc'}).exec((err, blogs) => { 
        if(err) throw new Error("Error in finding blogs");

        const slicedArray  = Array.from(blogs).slice(0,10);
        // console.log(slicedArray);
        res.status(200).send(slicedArray);
      });
    }else if(flag === '1'){
      Blog.find({}).sort({createdAt: 'desc'}).exec((err, blogs) => { 
        if(err) throw new Error("Error in finding blogs");

        // console.log(blogs);
        res.status(200).send(blogs);
      });
    }
  } catch (e) {
    // console.log(e);
    res.status(400).send();
  }
})

router.post('/addBlog', cors(), auth ,async(req, res) => {
  try {
    console.log('Inside /blogs/addBlog/')
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown,
      views: 0
    })
    await blog.save();
    res.status(200).send(blog)
  } catch (error) {
    res.status(400).send()
  }
})

router.get('/:id', cors(), incViews, async(req, res) => {
  try {
    console.log("Inside FindBlog")
    Blog.findOne({_id: req.params.id}, (err, blog) => {
      if(err) throw new Error("Error in finding the Blog");

      console.log(blog);
      res.status(200).send(blog);
    })
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
})

router.get('/edit/:id', cors(), auth, async(req, res) => {
  try {
    console.log('Inside find blog to edit');
    Blog.findOne({_id: req.params.id}, (err, blog) => {
      if(err) throw new Error("Error in finding the Blog");

      console.log(blog);
      res.status(200).send(blog);
    })
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
})

router.post('/edit/:id', cors(), auth, async(req, res) => {
  try {
    console.log('Insider Edit Blog')
    const blog = await Blog.findOneAndUpdate({_id: req.params.id}, {
                                          title: req.body.title,
                                          description: req.body.description,
                                          markdown: req.body.markdown
                                        }, {new: true}
                                      )

    if(!blog){
      throw new Error('Unable to update blog');
    }
    res.status(200).send(blog);
  } catch (e) {
    console.log(e);
    res.status(500).send()
  }
})

router.delete('/:id', cors(), auth, async(req, res) => {
  try {
    console.log('inHere');
    const blog = await Blog.findByIdAndDelete(req.body.id);

    if(!blog){
      res.status(404).send();
    }
    console.log(blog);
    res.send(blog);
  } catch (e) {
    res.status(500).send();
  }
})

module.exports = router;