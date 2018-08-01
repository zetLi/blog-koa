const router = require('koa-router')()

// 判断是否登录的中间件
async function isLoginUser(ctx,next) {
  if (!ctx.session.user) {
    ctx.flash = {warning:'未登录，请先登录'}
    return ctx.redirect('/signin')
  }
  await next()
}

// 判断是否管理员中间件
async function isAdmin (ctx, next) {
  if (!ctx.session.user) {
    ctx.flash = { warning: '未登录, 请先登录' }
    return ctx.redirect('/signin')
  }
  if (!ctx.session.user.isAdmin) {
    ctx.flash = { warning: '没有权限' }
    return ctx.redirect('back')
  }
  await next()
}

module.exports = (app) => {
  router.get('/', require('./posts').index)
  // router.get('/about',require('./about').index)
  router.get('/user/:username', require('./user').index)
  router.get('/signup', require('./user').signup)
  router.post('/signup', require('./user').signup)
  router.get('/signin', require('./user').signin)
  router.post('/signin', require('./user').signin)
  router.get('/signout', require('./user').signout)
  router.get('/posts/new',isLoginUser, require('./posts').create)
  router.post('/posts/new',isLoginUser, require('./posts').create)
  router.get('/posts', require('./posts').index)
  router.get('/posts/:id',isLoginUser, require('./posts').show)
  router.get('/posts/:id/edit',isLoginUser, require('./posts').edit)
  router.post('/posts/:id/edit',isLoginUser, require('./posts').edit)
  router.get('/posts/:id/delete',isLoginUser, require('./posts').destroy)
  router.post('/comments/new', isLoginUser, require('./comments').create)
  router.get('/comments/:id/delete', isLoginUser, require('./comments').destroy)
  router.get('/category', require('./category').list)
  router.get('/category/new', require('./category').create)
  router.post('/category/new', require('./category').create)
  router.get('/category/:id/delete', require('./category').destroy)
  app
    .use(router.routes())
    .use(router.allowedMethods())

  // 404
  app.use(async (ctx, next) => {
    await ctx.render('404', {
      title: 'page not find'
    })
  })
}
