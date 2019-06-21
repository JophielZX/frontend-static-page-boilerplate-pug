const glob = require('glob')

const getPages = () => {
  const files = glob.sync('src/pages/*')
  const pageNames = files.map(item => item.split('/')[2])
  const pages = {}
  pageNames.forEach(page => {
    pages[page] = {
      entry: `src/pages/${page}/${page}.js`, // page 的入口
      template: `src/pages/${page}/${page}.pug`, // 模板来源
      filename: page === 'home' ? 'index.html' : `${page}.html`, // 在 dist/的输出
      minify: {
        collapseWhitespace: true
      }
    }
  })
  return pages
}

module.exports = {
  productionSourceMap: false, // 是否需要生产环境的 source map
  pages: getPages(), // 多页应用配置，当前会自动配置，只需要在 src/pages/ 目录下按示例代码 home 和 about 的方式去保持目录结构即可
  chainWebpack: config => {
    // 默认 pug-plain-loader 不支持 pug 文件里使用 require，会造成图片地址无法正常被 webpack 管理
    // 所以这里使用 pug-loader 替换 pug-plain-loader 来管理 pug 文件
    // 这个操作并不会影响 vue 模板里使用 pug
    const pugRule = config.module.rule('pug')
    const pugTemplate = pugRule.oneOf('pug-template')
    pugTemplate.uses.clear()
    pugTemplate
      .use('pug-loader')
      .loader('pug-loader')
      .options({ pretty: false })
      .end()
  }
}
