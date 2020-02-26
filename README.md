# frontend-static-page-boilerplate-pug

## 前言

前端目前已经进入了工业化时代，但是仍有许多项目需要使用后端渲染，而且是比较传统的前端输出静态页，再由后端改模板并渲染页面的模式。相较于当前（2020 年）主流的三大框架（Vue, React, Angular）的生态以及开发体验，这种传统的静态页开发方式显得较为原始。

有鉴于此，此项目旨在尝试引入较为现代的工具以及开发方式，来改善传统静态页面的开发体验。目前较为主流的前端打包工具是 Webpack，但 webpack 的配置项较为繁琐，从零开始编写会消耗大量时间与精力。幸运的是，Vue Cli 为我们做了大量的工作，虽然它是为 Vue 项目而生，但我们可以对它进行定制，尽可能符合我们的需求。

## 项目介绍

### 技术组成

- 基础框架：[Vue Cli](https://cli.vuejs.org/zh/)
- 打包工具：[Webpack](https://webpack.js.org/)
- 模板引擎：[Pug](https://pugjs.org/)
- CSS 预处理器：[Scss](https://sass-lang.com/)
- 编程语言：[Typescript](https://www.typescriptlang.org/)
- 脚本编译：[Typescript](https://www.typescriptlang.org/) + [Babel](https://babeljs.io/)
- 静态代码分析：[ESLint](https://eslint.org/)
- 开发服务器：[WebpackDevServer](https://webpack.js.org/configuration/dev-server/)

此项目是在 [Vue Cli](https://cli.vuejs.org/zh/) 的项目模板上修改而来的，因为 `Vue Cli` 对多页应用提供了良好支持，而且对于 Webpack 的配置以及封装较为彻底，基本开箱即用。众所周知，Webpack 很强大，但是配置相对复杂，所以我们可以尝试在模板上根据自己的需要进行定制。

### 技术选型

#### 组件化

为了让项目支持组件化，我们需要引入模板引擎来帮助我们，但这种方式的组件化与 Vue 的组件化有很大差异，之所以不直接使用 Vue，是因为我们需要照顾后端渲染，SPA 把模板写在 JS 里了，无法进行后端渲染。

曾经考虑过使用 Prerender 对 SPA 进行预编译来获得静态页，这样就可以使用 Vue 来获得良好的开发体验。但是这种方式，有个弊端，浏览器会将结果渲染两次：html 一次， js 一次。后端人员进行模板渲染的时候，必定会需要修改 html，那么会造成 html 渲染的页面与 js 渲染的页面不一致，所以这种方案不可行。

#### 模板引擎

之所以选择 Pug，主要还是因为自己熟悉，而且 Pug 较为简洁，噪音较少。大家可以根据个人喜好来替代。

#### 编程语言

选择使用 Typescrict，原因是 Typescript 是 Javascript 的超集，并在此基础上增加了类型系统、接口以及其他一些优秀的特性，这意味着使用它并没有带来很大的学习成本，却能通过它获得很多的编程辅助。

我在写 js 代码时，常常会出现一些低级失误，如写错变量名，或忘记引用依赖等等。这些问题当然可以通过 ESLint 一定程度上解决，但是遇到一些类型上的错误，就很难发现了，特别是 `'10'` 与 `10` 的差异，常常被我们忽略。Typescript 会严格的区分各种类型，帮助我们更严格地去编写代码，同时还能拥有更智能的代码提示、补全以及依赖自动引入等功能。

退而求其次，就用写 JS 的方式去写 TS 也是可以的，这也是 Typescript 也被称作 Anyscript 的原因 😀。

以我个人角度而言，是更倾向于使用 Typescript 的，不只是因为它现在很流行，更是因为它对我真的有帮助。大家可以根据自己的需要进行选择。

### 项目结构

#### 项目整体结构

```bash
root
  │  .browserslistrc        # 需要支持的浏览器列表
  │  .editorconfig          # EditorConfig 的配置
  │  .eslintignore          # ESLint 忽略文件配置
  │  .eslintrc.js           # ESLint 的配置
  │  .gitignore             # 不提交到 git 仓库的文件配置
  │  .prettierrc            # Prettier 的配置
  │  babel.config.js        # babel 的配置
  │  LICENSE                # 许可说明
  │  package.json           # npm 包配置
  │  README.md              # 项目描述文档
  │  tsconfig.json          # Typescript 配置文件
  │  vue.config.js          # Vue Cli 配置文件
  │  yarn.lock              # Yarn 安装项目依赖时自动生成
  │
  ├─dist                    # 业务代码编译输出目录
  ├─public                  # 公用资源目录
  └─src                     # 业务代码源码目录
```

#### 业务代码放在 src 目录下

```bash
src
  ├─assets                  # 静态资源目录
  ├─components              # 组件目录
  │  ├─nav
  │  │      nav.pug
  │  │      nav.scss
  │  │      nav.ts
  │  └─ ... # 每个组件对应的文件统一装在一个文件夹，方便管理
  │
  └─views                   # 页面目录
      ├─demo                # Demo 页
      │      demo.pug
      │      demo.scss
      │      demo.ts
      │
      └─home                # 首页
      │      home.pug
      │      home.scss
      │      home.ts
      └─ ...  # 每个页面对应的文件统一装在一个文件夹，方便管理
```

由于 Webpack 的打包并不依赖文件结构，所以业务代码的文件结构组织相对比较自由，以上是示例代码的基本结构，大家可以参考。

> 需要特别注意的是，虽然 Webpack 打包不依赖文件结构，但是它对 **入口文件** 以及 **html 模板文件** 的路径还是有要求的，建议大家不要轻易改动文件结构，除非自己真的清楚每一个改动的影响。

### 浏览器兼容性

- 主流浏览器
- IE9+

### 使用方式

#### 下载模板

```bash
git clone git@github.com:JophielZX/frontend-static-page-boilerplate-pug.git
```

#### 安装

```
yarn install
```

#### 开发

```
yarn serve
```

#### 编译

```
yarn build
```

#### ESLint

```
yarn lint
```

#### 打包分析

```
yarn analyze
```

## 项目细节：如何从 Vue 模板定制自己的项目

#### 1. 首先用 Vue Cli 生成一个新的项目

```
vue create my-project
```

过程中根据自己需要进行选择。

#### 2. 项目根目录新建 vue.config.js 文件

几个主要配置：

- pages：多页应用的核心配置；

  假设现在项目目录如下：

  ```bash
  views
      ├─demo
      │      demo.ts
      │      demo.pug
      │      demo.scss
      │
      └─home
              home.ts
              home.pug
              home.scss
  ```

  那么，我们的配置就是

  ```js
    pages: {
      home: {
        entry: 'src/pages/home/home.ts',
        template: 'src/pages/home/home.pug',
        filename: 'index.html', // 首页默认命名为 index.html
        minify: false // 不压缩 html
      },
      demo: {
        entry: 'src/pages/demo/demo.ts',
        template: 'src/pages/demo/demo.pug',
        filename: 'demo.html',
        minify: false // 不压缩 html
      },
    }
  ```

  项目中存在几个页面，就需要配置几个 page，因为底层上是调用 html-webpack-plugin 来进行处理的。

- pug-loader：支持模板引擎 Pug；

  ```js
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
  }
  ```

  如果你需要其他模板引擎，则可以参考这个配置去实现。使用其他模板引擎也许不用像上面这么麻烦，这里是因为 Vue 项目模板默认自带 pug 支持，所以定制的时候需要先清除默认规则，再添加新规则。

- productionSourceMap: 是否需要生产环境的 source map

  ```js
  productionSourceMap: false,
  ```

  这样配置，执行 build 操作默认不生成 source map，因为生产环境使用 source map 不安全。如果有测试需要，可以改成 true。

- css.sourceMap: 是否为 CSS 开启 source map

  ```js
  css: {
    sourceMap: true
  },
  ```

  开启开发环境 sourcemap，方便调试。

- devServer.hot: 是否开启热加载

  ```js
  devServer: {
    hot: false
  }
  ```

  此处关闭热加载，是为了能够让 html 文件修改后能自动刷新浏览器，但是就不能享受热加载的好处了。

## 总结

感谢现在前端生态的逐渐完善，让我们的开发体验更加的棒。虽然我不是大神，但是站在大神的肩膀上，也可以有自己的一些小贡献。希望这个项目对大家有所帮助与启发，如果觉得没有帮到你，也请一笑而过。
