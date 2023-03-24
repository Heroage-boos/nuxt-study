import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    //配置别名
    images: fileURLToPath(new URL("./assets/images", import.meta.url)),
    style: fileURLToPath(new URL("./assets/style", import.meta.url)),
    data: fileURLToPath(new URL("./assets/other", import.meta.url)),
  },

  //运行时的配置,该对象的值只能从服务器使用 访问useRuntimeConfig。它主要应该持有不暴露在前端的私有配置。这可能包括对您的 API 秘密令牌的引用。public和下的任何东西app也会暴露在前端。在运行时，值会自动替换为匹配的环境变量，例如，设置环境变量NUXT_API_KEY=my-api-key NUXT_PUBLIC_BASE_URL=/foo/会覆盖下面示例中的两个值。
  runtimeConfig: {
    apiSecret: "apiSecret", //私钥  只能在服务器端使用的私钥
    public: {
      //暴露给客户的公钥,公众号内的密钥也会在客户端曝光
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
    },
  },

  // 将直接传递给 Vite 的配置 有关详细信息，请参阅https://vitejs.dev/config 。请注意，并非所有 vite 选项都在 Nuxt 中受支持。
  vite: {
    css: {
      //全局样式导入
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/colors.scss" as *;',
        },
      },
    },
  },

  app: {
    //全局应用配置
    baseURL: "", //基本url
    buildAssetsDir: "/_nuxt/", //默认： "/_nuxt/"构建站点资产的文件夹名称，相对于baseURL（或cdnURL如果已设置）。
    keepalive: false, //页面之间 KeepAlive 配置,单个页面上可配置definePageMeta覆盖
    head: {
      //在每个页面上设置默认配置<head>。
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
      link: [],
      style: [],
      script: [],
      noscript: [],
    },
    rootId: "root", //自定义nuxt根元素id
    rootTag: "div", //自定义nuxt根元素标签 默认 div
    layoutTransition: false, //是否开启布局切换过渡动画
    pageTransition: { name: "page", mode: "out-in" }, //页面过渡动画
  },
  appConfig: {}, //额外的应用程序配置 对于编程使用和类型支持，您可以直接提供带有此选项的应用程序配置。它将app.config作为默认值与文件合并
  build: {
    //构建配置
    analyze: false, //Nuxt包解析 用于webpack-bundle-analyzer可视化您的捆绑包以及优化 默认false
    templates: [
      //提供自己的模板，这些模板将根据 Nuxt 配置进行渲染
      // {
      //   src: "~/modules/support/plugin.js", // 可以是相对路径也可以是绝对路径
      //   dst: "support.js", // `dst` 是相对于.nuxt 目录
      //   options: {
      //     live_chat: false,//选项作为`options`键提供给模板。
      //   },
      // },
    ],
    transpile: [], //Babel 转译特定的依赖
  },
  buildDir: ".nuxt", //放置构建的 Nuxt 文件的目录 默认/<rootDir>/.nuxt
  components: {
    //配置 Nuxt components 组件自动注册,配置的目录中的任何组件都可以在整个页面、布局（和其他组件）中使用，而无需显式导入它们。
    dirs: [
      {
        path: "~/components/global",
        global: true,
      },
      "~/components",
    ],
  },
  css: [
    //定义要全局设置的 CSS 文件/模块/库（包含在每个页面中）。
    // "bulma",//直接加载一个Node.js模块（这里是一个Sass文件）。
    // "@/assets/css/main.css",//项目中的css文件
    "@/assets/style/index.scss", //项目中的scss文件
    "@/assets/style/common.scss", 
  ],
  debug: false, //设置为true开启调试模式  在服务器上打印出hook名称和时间，并在浏览器中记录hook参数

  devServer: {
    //开发服务器
    host: "", //默认值:localhost
    https: false, //是否开启https
    port: 3000, //监听端口 默认"3000"
    url: "http://localhost:3000", //监听url
  },
  devServerHandlers: [], //Nitro 仅开发服务器处理程序。具体参阅： https: //nitro.unjs.io/guide/introduction/routing
  dir: {
    //自定义Nuxt使用的目录结构，除非需要，否则最好坚持使用默认值。
    assets: "assets", //静态资源目录 默认： "assets"
    layouts: "layouts", //布局目录，其中的每个文件都会自动注册为 Nuxt 布局。 默认： "layouts"
    middleware: "middleware", //中间件目录，其中的每个文件都会自动注册为Nuxt中间件。默认： "middleware"
    pages: "pages", //将被处理以自动生成应用程序页面路由的目录。 默认： "pages"
    plugins: "plugins", // plugins 目录，其中的每个文件都会自动注册为 Nuxt 插件。默认： "plugins"
    public: "public", //dist包含静态文件的目录，可通过 Nuxt 服务器直接访问这些文件，并在生成应用程序时将其复制到文件夹中。 默认： "public"
    static: "static", //默认： "public"
  },
  experimental: {
    asyncEntry: false, //设置为 true 以生成 Vue 包的异步入口点（用于模块联合支持）。默认： false
    componentIslands: false, //支持experimental components和 .island.vue 文件
    configSchema: false, //配置架构支持
    crossOriginPrefetch: false, //使用 Speculation Rules API 启用跨源预取。
    externalVue: true, //外部化vue，@vue/*并vue-router在构建时。 参阅： https: //github.com/nuxt/nuxt/issues/13632
    inlineSSRStyles: true, //呈现 HTML 时的内联样式（目前仅 vite）
    noScripts: false, //关闭 Nuxt 脚本和 JS 资源提示的渲染。
    payloadExtraction: false, //当启用此选项时（默认情况下）生成的页面的有效负载nuxt generate被提取
    reactivityTransform: false, //启用 Vue 的反应性转换
    treeshakeClientOnly: true, //Tree shakes 服务器包中仅客户端组件的内容。参阅： https: //github.com/nuxt/framework/pull/5750
    viteNode: true, //使用 vite-node 进行按需服务器块加载
    viteServerDynamicImports: true, //将服务器包拆分为多个块并动态导入它们。 参阅： https: //github.com/nuxt/nuxt/issues/14525
    writeEarlyHints: false, //使用节点服务器时写早期提示。
  },
  extends: "", //从多个本地或远程源扩展项目。值应该是指向源目录或相对于当前配置的配置路径的字符串或字符串数​​组。您可以使用github:、gitlab:或从远程bitbucket:githttps://存储库进行扩展
  extensions: [
    // Nuxt 解析器解析的扩展。
    ".js",
    ".jsx",
    ".mjs",
    ".ts",
    ".tsx",
    ".vue",
  ],
  generate: {
    exclude: [], //不再使用此选项。相反，使用nitro.prerender.ignore.
    routes: [], //要生成的route。如果您使用的是爬虫，这将只是路由生成的起点。这在使用动态路由时通常是必需的。首选使用nitro.prerender.routes. 示例 routes: ['/users/1', '/users/2', '/users/3']
  },
  hooks: undefined, //hook 是 Nuxt 事件的侦听器，通常在模块中使用，但也可用于nuxt.config
  ignore: [
    //可定制ignorePrefix：所有匹配数组内指定的 glob 模式的文件ignore都将在构建中被忽略。
    "**/*.stories.{js,ts,jsx,tsx}",
    "**/*.{spec,test}.{js,ts,jsx,tsx}",
    "**/*.d.ts",
    ".output",
    "**/-*.*",
  ],
  ignoreOptions: {
    //将选项直接传递给node-ignore（Nuxt 使用它来忽略文件）。
    ignorecase: false,
  },
  ignorePrefix: "-", //如果文件名以指定的前缀开头pages/，layouts/则 、middleware/或中的任何文件都将在构建过程中被忽略。store/ignorePrefix
  imports: {
    //Nuxt 如何将可组合项自动导入您的应用程序。
    dirs: [], //一组将自动导入的自定义目录。请注意，此选项不会覆盖默认目录（~/composables、~/utils）
    global: false,
  },
  modules: [
    //模块是 Nuxt 扩展，可以扩展其核心功能并添加无穷无尽的集成。
    // '@nuxtjs/axios',//使用软件包
    // '~/modules/awesome.js',//使用其他项目路径
    // ['@nuxtjs/google-analytics', { ua: 'X1234567' }],
    // function () {}//内联定义
  ],
  modulesDir: [
    //用于设置路径解析的模块目录（例如，webpack 的resolveLoading,nodeExternals和postcss）
    "node_modules", //默认值
    "/Users/daniel/code/nuxt.js/packages/schema/node_modules", //默认值
  ],
  nitro: {
    //nitro的配置 参阅https: //nitro.unjs.io/config/
  },
  pages: true, //pages/是否在 Nuxt 3 中使用 vue-router 集成。如果你没有提供一个值，如果你的源文件夹中有一个目录，它将被启用。
  plugins: [
    //一系列 nuxt 应用程序插件。插件也会从目录中自动注册，除非您需要自定义它们的顺序，否则~/plugins不需要列出这些插件。nuxt.config所有插件都通过它们的 src 路径进行了重复数据删除
  ],
  postcss: {
    plugins: {
      //配置 PostCSS 插件的选项。 参阅：https://postcss.org/
      autoprefixer: {},
      cssnano: true,
    },
  },
  rootDir: "", //根目录 这个属性可以被覆盖（比如运行nuxt ./my-app/会设置rootDir为从当前/工作目录的绝对路径./my-app/。一般不需要配置这个选项。默认： "/<rootDir>"
  routeRules: {}, //应用于匹配服务器路由的全局路由选项 参阅： https: //nitro.unjs.io/config/#routes
  serverHandlers: [
    //服务器处理程序。 参阅： https: //nuxt.com/docs/guide/directory-structure/server
    // { route: '/path/foo/**:name', handler: '~/server/foohandler.ts' }
  ],
  sourcemap: {
    //是否生成 sourcemaps。
    server: true,
    client: false,
  },
  srcDir: "", //定义 Nuxt 应用程序的源目录。如果指定了相对路径，它将相对于rootDir.
  ssr: true, //是否启用 HTML 呈现 - 动态（在服务器模式下）或在生成时。如果设置为目标false并与目标结合static，生成的页面将只显示一个没有内容的加载屏幕
  telemetry: true, //是否参与nuxt测试提供使用信息,手动禁用 nuxt telemetry   参阅:https://github.com/nuxt/telemetry
  test: false, //您的应用程序是否正在接受单元测试。
  theme: "", //从本地或远程源扩展项目。值应该是指向源目录或相对于当前配置的配置路径的字符串。您可以使用github:、gitlab:或从远程bitbucket:githttps://存储库进行扩展。
  typescript: {
    //Nuxt 的 TypeScript 集成配置。
    includeWorkspace: false, //在 Nuxt 项目中包含父工作区,主题和模块
    shim: true, //生成*.vue
    strict: true, //是否严格模式
    tsConfig: "./tsconfig.json", //.nuxt/tsconfig.json可以使用此选项扩展生成的。
    typeCheck: false, //启用构建时类型检查。 如果设置为 true，这将在开发中进行类型检查。您可以通过将其设置为build. 需要安装typescript并vue-tsc作为开发依赖项。参阅： https: //nuxt.com/docs/guide/concepts/typescript
  },

  //Vue.js 配置 请参阅：https://vuejs.org/api/application.html#app-config-compileroptions
  vue: {},
  workspaceDir:"",//定义应用程序的工作区目录。 默认： "/<rootDir>" 这通常在 monorepo 设置中使用。Nuxt 将尝试自动检测您的工作区目录，但您可以在此处覆盖它。通常不需要配置此选项。
});
