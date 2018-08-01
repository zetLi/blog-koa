module.exports =  {
    port: process.env.PORT || 3000,
    session: {
      key: 'blogkoa',
      maxAge: 86400000
    },
    mongodb: 'mongodb://bloguser:mongodb123@localhost:27017/blog-koa'
  }