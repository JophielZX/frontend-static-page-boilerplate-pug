# frontend-static-page-boilerplate-pug

## 前言
前端目前已经进入了工业化时代，但是仍有许多项目需要使用后端渲染，而且是比较传统的前端输出静态页，后端改模板并渲染页面的模式。相较于当前（2019年）主流的三大框架（Vue, React, Angular）的生态以及开发体验，传统的静态页开发方式非常的原始。所以，此项目旨在引入较为现代的工具以及开发方式，来改善传统静态页面的开发体验。

## 项目介绍

### 技术组成
- 打包工具：Webpack
- 模板引擎；Pug
- CSS 预处理器：SCSS

此项目是在 [Vue Cli 3](https://cli.vuejs.org/zh/) 的项目模板上修改而来的，因为 Vue 对多页应用的支持较好，而且对于 Webpack 的配置以及封装较为彻底，基本开箱即用。众所周知，Webpack 很强大，但是配置过于复杂，所以我决定在模板上根据自己的需要进行定制，主要是懒😀。

### 技术选型

#### 组件化
为了让项目支持组件化，我们需要引入模板引擎来帮助我们，但这种方式的组件化与 Vue 的组件化有很大差异，之所以不直接使用 Vue，是因为我们需要照顾后端渲染，SPA 把模板写在 JS 里了，无法进行后端渲染。

曾经考虑过使用 Prerender 对 SPA 进行预编译来获得静态页，这样就可以使用 Vue 来获得良好的开发体验。但是这种方式，有个弊端，浏览器会将结果渲染两次：html 一次， js 一次。后端人员进行模板渲染的时候，必定会需要修改 html，那么会造成 html 渲染的页面与 js 渲染的页面不一致，所以这种方案不可行。

#### 打包工具
对于打包工具的选择，也是经过了一番考量。我曾经用 Gulp 写了一个版本，也曾经运用于生产环境，效果还算不错，但是开发方式仍然比较传统。而且，对于开发环境与生产环境的分离，需要自己编写大量代码（可能是我水平问题）。

为了更好的支持开发热加载，以及对 es6 更好的支持，所以我决定选择使用 Webpack。

#### 模板引擎
之所以选择 Pug，主要还是因为自己熟悉，而且 Pug 较为简洁，噪音较少。大家可以根据个人喜好来替代。

### 使用方式

#### 下载模板
``` bash
git clone git@github.com:JophielZX/frontend-static-page-boilerplate-pug.git
```

#### 安装
```
npm install
```

#### 开发
```
npm run serve
```

#### 编译
```
npm run build
```

#### ESLint
```
npm run lint
```

## 项目细节：如何从 Vue 模板定制自己的项目

#### 1. 首先用 Vue Cli 3 生成一个新的项目
```
vue create my-project
```
过程中根据自己需要进行选择。

#### 2. 项目根目录新建 vue.config.js 文件
几个主要配置：

- pages：多页应用的核心；

  假设现在项目目录如下：
  ```
  pages
      ├─about
      │      about.js
      │      about.pug
      │      about.scss
      │
      └─home
              home.js
              home.pug
              home.scss
  ```

  那么，我们的配置就是

  ``` js
    pages: {
      home: {
        entry: 'src/pages/home/home.js',
        template: 'src/pages/home/home.pug',
        filename: 'index.html',
      },
      about: {
        entry: 'src/pages/about/about.js',
        template: 'src/pages/about/about.pug',
        filename: 'about.html',
      },
    }
  ```

  有几个页面，就需要配置几个 page，因为底层上是调用 html-webpack-plugin 来进行处理的。

- pug-loader：支持模板引擎 Pug；

  ``` js
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
  ```
  如果你需要其他模板引擎，则可以参考这个配置去实现。使用其他模板引擎也许不用像上面这么麻烦，这里是因为 Vue 项目模板默认自带 pug 支持，所以定制的时候需要先清除默认规则，再添加新规则。

- productionSourceMap: 是否需要生产环境的 source map

  ``` js
  productionSourceMap: false,
  ```
  这样配置，执行 build 操作默认不生成 source map，因为生产环境使用 source map 不安全。如果有测试需要，可以改成 true。

## 总结
感谢现在前端生态的逐渐完善，让我们的开发体验更加的棒。虽然我不是大神，但是站在大神的肩膀上，也可以有自己的一些小贡献。希望这个项目对大家有所帮助与启发，如果觉得没有帮到你，也请一笑而过。
