/* eslint-disable @typescript-eslint/no-var-requires */
const glob = require('glob')

const getPages = () => {
  const files = glob.sync('src/views/*')
  const pageNames = files.map(item => item.split('/')[2])
  const pages = {}
  pageNames.forEach(page => {
    pages[page] = {
      entry: `src/views/${page}/${page}.ts`, // page 的入口
      template: `src/views/${page}/${page}.pug`, // 模板来源
      filename: page === 'home' ? 'index.html' : `${page}.html`, // 在 dist/的输出
      minify: false // 不压缩 html
    }
  })
  return pages
}

module.exports = {
  pages: getPages(), // 多页应用配置，当前会自动配置，只需要在 src/pages/ 目录下按示例代码 home 和 about 的方式去保持目录结构即可
  productionSourceMap: false, // 是否需要生产环境的 source map
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
      .options({ pretty: true })
      .end()
  },
  css: {
    sourceMap: true // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
  },
  devServer: {
    hot: false // 热加载，此处关闭是为了 html 能够实时刷新
  }
}
