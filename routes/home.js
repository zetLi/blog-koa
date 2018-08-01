const PostModel = require('../models/post')
module.exports = {
    async index (ctx, next) {
      const posts = await PostModel.find({})
      await ctx.render('index', {
        title: 'zetLi-blog',
        desc: '欢迎访问zetLi的博客',
        posts
      })
    }
  }