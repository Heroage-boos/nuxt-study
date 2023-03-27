## 介绍 

​      nuxt可以使用vue.js创建类型安全、高性能和生产级的全栈Web应用程序和网站，服务端渲染（同构渲染spa+ssr），typeScript支持，代码拆分（减小应用初始化时间）
  缺点：改动页面一个地方dom都需要重新请求页面，对服务器压力比较大

1.服务器引擎
      nuxt服务器引擎Nitro解锁了全栈功能。
  开发中，使用Rollup和Node.js worker来实现服务器代码和上下文隔离
  生产中，将应用程序和服务器构建到一个通用.output目录中，可以放在任何javascript系统数部署此输出，包括Node.js,无服务器，Wokers,边缘端渲染或纯静态

2.模块化
        模块系统允许使用自定义功能与第三方服务的集成来扩展nuxt



## 安装nuxt3

  环境配置node.js >=v14.16.0、
  文本编辑器:带有Volar Extension 的visual studio code、
  终端-为了运行nuxt命令
1.创建项目  
 npx nuxi init <项目名>  ||  pnpm dlx nuxi init <project-name>
 注意：上一步可能会报错： ERROR  Error: Failed to download template from registry: request to https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json failed, reason: read ECONNRESET 请添加hosts：185.199.108.133 raw.githubusercontent.com或raw.githubusercontent.com

 npm install || yarn install



## 配置

### Nuxt配置

1.nuxt.config.ts ,可以覆盖或扩展应用程序的行为

![image-20230321165800077](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230321165800077.png)

  参考配置nuxt3官网：https://nuxt.com/docs/api/configuration/nuxt-config#alias

```js
  export default defineNuxtConfig({

	 ...
   })
```



1、useRuntimeConfig

   	 useRuntimeConfig用于在应用程序中公开配置变量。

```json
··
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: '123', // 私钥只能在服务器上使用
    public: {// 暴露给客户的公钥
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
··
```



2.配置-环境变量和私有令牌

​	API rutimeCofig向其他应用程序的其余部分公开环境变量等值，默认情况下仅在服务器端可用，其中密钥runtimeConfig.public 也可以在客户端使用

```
··nuxt.config.ts
//全局范围生效
export default defineNuxtConfig({
      runtimeConfig:{//运行时的配置
        apiSecret:"abcdefg",//私钥  只能在服务器端使用的私钥
        public:{
            apiBase:"/api"//公众号内的密钥也会在客户端曝光
        }
      }
});
··
```

​	使用可组合项，这些变量会暴露给应用程序

```
``页面/index.vue
<script setup>
   const runtimeConfig = useRuntimeConfig()
</script>
``
```

```json
··nuxt.config.ts
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
``
```

​	

#### 配置代理

Nuxt3 最新的正式版使用了`nitro`做为 dev server, 在其[官方文档](https://link.segmentfault.com/?enc=ibjMcxFqrwEFz4hShIYiJA%3D%3D.XJV9FPpg387gVQVFj97n7DGk6p4tMtOz3da%2FLPof55ojcHRabUldImo1lclVS1Cq)中，有说明如何配置代理:

```javascript
{
  devProxy: {
    '/proxy/test': 'http://localhost:3001',
    '/proxy/example': { target: 'https://example.com', changeOrigin: true }
  }
}
```

我们需要将该配置代理的选项放置到 nuxt.config.ts 文件的 nitro 选项中，如下：

```javascript
export default defineNuxtConfig({
  // ...other setting
  server: false, // 不开启服务端渲染
  nitro: {
    devProxy: {
      "/api": {
        target: "http://localhost:3001", // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
});
```

该方式针对服务端渲染的场景也能生效，但是仅会针对发生在客户端测的请求进行代理。比如设置了`server: false`或者因为一些交互行为而触发的网络请求。

```javascript
const { data: userinfo } = await useFetch("/api/userinfo", {
  server: false,
});
```

3.更多常用配置

|  常用配置   |      配置文件      |
| :---------: | :----------------: |
| TypeScript  |   tsconfig.json    |
|   Vitest    |  vitest.config.ts  |
|   EsLint    |    .eslintrc.js    |
|  Prettier   |  .prettierrc.json  |
|  Stylelint  | .stylelintrc.json  |
| TailwindCSS | tailwind.config.js |



## 视图

   Nuxt提供了几个组件来实现应用程序的应用功能,nuxt.js 入口点是app.vue

###  pages

​	目录中创建 components 文件夹，目录下的每个文件代表其内容的不同路径。要使用页面，创建pages/index.vue文件，并将<NuxtPage />组件添加app.vue（或删除`app.vue`默认条目）

```
``app.vue
<template>
	<div>
		<NuxtPage/>
	<div/>
</template/>
``
```

​	在页面中使用pages/目录下的文件

```
··pages/index.vue    pages/about.vue
	<div>
    <h1>Welcome to the homepage</h1>
     <!-- 跳帧到某个页面 -->
    <NuxtLink to="/about">about page</NuxtLink>
  </div>
··
```



###  components 

​	目录中创建 components 文件夹，目录下的组件在应用程序中可无需显式导入直接使用

```
··app.vue    components/appAlert.vue
 <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert>
      This is an auto-imported component.
    </AppAlert>
  </div>
··
```

​	

###   layouts

​	目录中创建 components 文件夹，包含多个页面的通用用户页面，例如页眉和页脚显示<slot/>布局是使用组件显示页面内容的vue文件。layouts/default.vue默认情况下使用该文件

​	

# 静态资源

### 	public

​		该目录作静态资产的公共服务器，可在您的应用程序定义的url上公开访问，public/ 您可以通过根url从浏览器中获取目录中的文件/

```
··
  <template>
  	<img src="/img/nuxt.png" />
  </template/>
··
```

###     assets

​		nuxt使用assets/目录来存储静态资源文件(样式表、svg、字体)，但该目录没有自动扫描功能，nuxt使用Vite或webpack来使用路径引用位于目录中的文件`~/assets/`配置别名。

```
··nuxt.config.ts
	export default defineNuxtConfig({
    alias: {//配置别名
        'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
        'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
        'data': fileURLToPath(new URL('./assets/other', import.meta.url))
      },
})
··
```

```
``page/index.vue
	<template>
        <img src="~/images/unnamed.webp"/>
	</template>
``
```

### 	全局样式导入

​	   要在nuxt组件样式中全局插入语句，可以在nuxt.config.ts配置

```json
``assets/style/colors.scss
	$primary: #49240F;
	$secondary: #E4A79D;
``
```

```js
``nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;'
        }
      }
    }
  }
})
``
```

```vue
``pages/bout.vue
<template>
    <div class="con">
        about
    </div>
</template>

<style  lang="scss">
.con {
    color: $secondary;
}
</style>
``
```



## 路由

​	nuxt一项核心功能就是系统路由器，目录中每一个vue文件pages/都会创建一个相应的url（路由)来显示文件的内容。通过对每个页面使用动态导入，nuxt利用代码拆分为请求的路由发送最少数量的javaScript。

###    page

​		nuxt路由基于vue-router并根据文件名从目录中创建每个组件生成路由，pages/此文件系统路由使用命名约定来创建动态和嵌套路由：

​        pages/
​         --| about.vue
​		 --| posts/
​		 ----| [id].vue	

###    导航

​	  通过<NuxtLink>组件链接他们之间的页面，它呈现一个<a>标签，该标签的href属性设置为页面的路由。

​	 <NuxtLink>在客户端进入视口时，Nuxt会自动提前预取链接页面的组件和有效负载（生成的页面），从而加快导航速度

```vue
``app.vue
<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
        <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>
``
```

​	

### 	路由参数

​	   使用 可组合项 useRoute() 可用于<script stup>块或方法中以访问当前路由详细信息。



### 	路由中间件(导航守卫)

​		路由中间件分为三种

​		1.匿名（内联）中间件，直接在使用它们的页面中定义

​		2.具名路由中间件，放在middleware/目录下，页面使用时会异步导入自动加载。（规范化：kebab-case规范，如果定义someMiddleware会变为some-middleware）

​	    3.全局路由中间件，放在middleware/目录下（带后缀.glabal)，每次路由变化都会自动运行

​		auth保护页面的中间件实例/dashboard:

```tsx
``middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated()是一个验证用户是否被认证的示例方法。authenticated
  if (isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
``
```

```vue
``pages/dashboard.vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
<template>
  <h1>Welcome to your dashboard</h1>
</template>
``
```

​	 示例：命名路由中间件

​	-| middleware/
​	---| auth.ts	

```tsx
··auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  console.log("to", to);
  console.log("from", from);
  if (to.params.id === "1") {
    return abortNavigation(); //停止当前导航
  }
  return navigateTo("/"); //重定向到给定路径，如果重定向到服务器端将，则将重定向代码设置为found 302
});
··
```

在你的页面文件中，可以引入这个路由中间件

```tsx
··
<script setup>
definePageMeta({
  middleware: ["auth"]
  // 或者 middleware: 'auth'
})
</script>
··
```



### 路由验证

​	页面中的validate属性来验证买每一个页面的路由验证。definePageMeta

​	 该validate属性接收route作为参数，可以返回一个布尔值来确定这是否是要使用此页面呈现的有效路由。如果返回false，找不到另一个匹配项，会导致404错误，也可以直接返回一个statusCode/的对象statusMessage来立即响应错误（不会检查其他匹配项)。

​	 如果有更复杂的用例，可以改用匿名路由中间件。

```vue
··pages/abc/a.vue
<script setup>
//路由验证
definePageMeta({
    validate: async (route) => {
        return /^\d+$/.test(route.params.id)//匹配不到直接返回404
    }
})
</script>
··
```

​	

## 搜索引擎优化&Meta

​	通过强大的头部配置、可组合项和组件改进您的nuxt应用程序的SEO.

###    默认值

​	 nuxt开箱即用，提供合理的默认值，您可以根据需要覆盖这些默认值。缺点：不可以动态设置

```json
··nuxt.config.ts
export defineNuxtConfig({
	app:{
	  head:{
	  		charset:"utf-8",
	  		viewport:"width=device-width,inital-scale=1"
		}
	}
})
··
```

### 	useHead

​		usehead允许您以编程和反应的方式管理您的头部标签，它只能与组件和生命周期挂钩一起使用setup。

```vue
··app.vue
<script setup lang="ts">
//编程式设置html头部
useHead({
  title: "nuxt实践",
  meta: [
    {
      name: "description",
      content: "学习nuxt,模拟nuxt开发"
    }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }],
  link: [//使用link来启用google字体
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: ''
    }
  ]
})

</script>
··
```

![0](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230323093516533.png)

​		您可以使用titleTempalte选项提供一个动态模板来自定义你网站中的标题，例如：将你的站点名称添加到每一个页面的标题中，titleTemplate是一个字符串，其中%s替换为标题，也可以是一个函数。

```vue
··使用useHead
<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Site Title` : 'Site Title';
  }
})
</script>
··
```

效果如下：

![image-20230323111556905](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230323111556905.png)

### 	使用SeoMeta

​		和可组合项让您可以将站点的SEO元标记定义为具有完整TypeScript支持的平面对象useSeoMeta,useServerSeoMeta

​		在大多数情况下，meta不需要加载，因为机器人只会扫描初始加载，作用useServerSeoMeta不会head在客户端执行任何操作的以性能为中心的实用程序

```vue
··pages/about.vue
<script setup lang="ts">
    useServerSeoMeta({
        title:"甜蜜商城",
        ogTitle:"甜蜜商城",
        description:"这是我的甜蜜商城描述，它是天下最好的商城！",
        ogDescription:"这是我的甜蜜商城描述，它是天下最好的商城！",
        ogImage:"https://example.com/image.png",
        twitterCard:"summary_large_image",
    })
</script>
··
```

​			在这段代码中，`useServerSeoMeta` 是一个用于设置服务器端 SEO 元数据的函数。通过调用这个函数并传入一个包含 SEO 元数据的对象，可以设置网页的标题、描述、OG 标题、OG 描述、OG 图像和 Twitter 卡片类型。

具体来说，这段代码设置了以下 SEO 元数据：

- 网页标题为 '甜蜜商城'。
- 网页描述为 '这是我的甜蜜商城描述，它是天下最好的商城！.'。
- OG 标题为 '甜蜜商城'。
- OG 描述为 '这是我的甜蜜商城描述，它是天下最好的商城！.'。
- OG 图像为 'https://example.com/image.png'。
- Twitter 卡片类型为 'summary_large_image'。

在 Nuxt.js 项目中使用这段代码可以帮助优化网页的 SEO，提高网页在搜索引擎中的排名和展示效果。

![image-20230323103047721](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230323103047721.png)

动态更改网页标题和meta，您应该使用计算的getter语法

```vue
··pages/about.vue
<script setup lang="ts">
 const title=ref('my title')
    //响应式改变网页的标题和描述
    useSeoMeta({
        title,
        description:()=>`descriptionL${title.value}`
    })
   </script>
··
```

![image-20230323104108510](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230323104108510.png)



###    Components

​		nuxt提供<Title>`, `<Base>`, `<NoScript>`, `<Style>`, `<Meta>`, `<Link>`,和组件，以便您可以直接与组件模板中的元数据进行交互`<Body>`。`<Html>``<Head>

​		这些组件名称与原生 HTML 元素相匹配，所以在模板中需要大写。

```vue
··other.vue
<script setup>
  const title = ref('Hello World')
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
      <Style type="text/css" children="body { background-color: green; }" />
    </Head>

    <h1>{{ title }}</h1>
  </div>
</template>
··
```

效果图：

![image-20230323105231654](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20230323105231654.png)



### 	类型

​	   useHead、app.head 和 组件的非响应式类型

```tsx
··
interface MetaObject {
  title?: string
  titleTemplate?: string | ((title?: string) => string)
  templateParams?: Record<string, string | Record<string, string>>
  base?: Base
  link?: Link[]
  meta?: Meta[]
  style?: Style[]
  script?: Script[]
  noscript?: Noscript[];
  htmlAttrs?: HtmlAttributes;
  bodyAttrs?: BodyAttributes;
}
··
```

### 	

## Transiton

nuxt利用vue的组件在页面和布局之间应用切换

通过启用页面转换可以对所有页面应用自动转换：



## 数据抓取

​	Nuxt提供了useFetch、useLazyFetch、useAsyncData和useLayncData来处理应用程序中数据获取。

### 	useFetch

​		在您的页面、组件和插件中，使用它useFetch从任何url中获取信息

​		 useAsyncData 提供了一个方便的包装器$fetch。它会根据url和获取选项自动生成秘钥，根据服务器路由为请求url提供类型提示，并推断api响应类型。

```vue
··pages/mockFetch.vue
	<script setup lang="ts">
const { data: count } = await useFetch(() => `api/24k/hot`, {
   params:{
    type:0
   }
});

··
```

### 	useLazyFetch

​		useLazyFetch行为与useFetch选项lazy:true集相同，异步函数不会阻止导航。

```vue
<template>
    <!-- you will need to handle a loading state -->
    <div v-if="pending">
        Loading ...
    </div>
    <div v-else>
        <div v-for="post in posts">
            <!-- do something -->
        </div>

    </div>
</template>
  
<script setup>
const { pending, data: posts } = useLazyFetch('/api/posts')
</script>
```

#### useAsyncData

​	使用useAsyncData来访问异步解析的数据

#####  useAsyncData和useFetch区别？

 	` useFetch`接收一个 URL 并获取该数据，而`useAsyncData`可能有更复杂的逻辑。`useFetch(url)`几乎等同于`useAsyncData(url, () => $fetch(url))`- 它是最常见用例的开发人员体验糖。

```typescript
··server/api/count.ts
	let counter = 0
	export default defineEventHandler(() => {
     counter++
     return counter
})
··
```

```vue
``app.vue
<script setup>
const { data } = await useAsyncData('count', () => $fetch('/api/count'))
</script>

<template>
  Page visits: {{ data }}
</template>

```

#### useLazyAsyncData

​	此可组合项的行为与`useAsyncData`选项`lazy: true`集相同。换句话说，异步函数不会阻止导航。这意味着您将需要处理数据所在的情况`null`

```
··app.vue
<template>
  <div>
    {{ pending ? 'Loading' : count }}
  </div>
</template>

<script setup>
const { pending, data: count } = useLazyAsyncData('count', () => $fetch('/api/count'))
watch(count, (newCount) => {//count一开始是空的，所以不会访问接口

})
</script>
··
```

#### RefreshingData 刷新Nuxt数据

​	有时，用户访问页面的过程中，需要刷新从api加载数据，如果用户选择分页、过滤结果，搜索等，可以使用refresh()从useFetch()可组合项返回的方法来刷新不同查询参数的数据。

```vue
··app.vue
<script setup lang="ts">
const page = ref(1)

//刷新请求数据接口
const { data: users, pending, refresh, error } = await useFetch(() => `users?page=${page.value}&take=6`, { baseURL: "/mock " }
)

//上一页
function previous() {
    page.value--
    refresh()
}
    
// 下一页
function next() {
    page.value++
    refresh()
}

</script>
··
```

​	查询参数更改时调用`refresh()`从可从组合项返回方法；

​	默认情况下，`refresh()`将取消任何挂起的请求，它们的结果不会更新数据或挂起状态。在此新请求解决之前，任何先前等待的承诺都不会解决。您可以通过设置选项来防止此行为`dedupe`，如果有的话，该选项将返回对当前正在执行的请求的承诺。

```js
··
	refresh({ dedupe: true })
··
```

####  

#### clearNuxtData清除nuxt缓存数据

​	`useAsyncData`删除缓存数据、错误状态和和的未决承诺`useFetch`。

如果您想使另一个页面的数据获取无效，可以使用clearNuxtData。



#### API支持

​	 asyncData Nuxt3提供了一种在option api中抓取的方法，必须将组件定义包装在其中，definedNuxtComponent工作。

```vue
··components/other.vue
<script lang="ts">
export default defineNuxtComponent({
    fetchKey: 'hello',
    async asyncData() {
        return {
            hello: await $fetch('/api/hello')
        }
    }
})
</script>
··
```

#### $fetch 直接使用

​	某些情况下，您可能需要直接调用 API。Nuxt 3 提供了一个全局可用的`$fetch`方法，使用与[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)相同的 API 的[unjs/ofetch](https://github.com/unjs/ofetch)（除此之外） 。`fetch`使用`$fetch`有许多好处，包括：

如果它在服务器上运行，它将“巧妙地”处理直接 API 调用，或者如果它在客户端上运行，则对您的 API 进行客户端调用。（它还可以处理调用第三方 API。）它还具有便利的功能，包括自动解析响应和字符串化数据。

#### 同构$fetch 和 fetch 调用（标头隐藏，cookie...）

​	`$fetch`在浏览器中调用时，像这样的用户标头`cookie`将被直接发送到 API。但在服务器端呈现期间，由于`$fetch`请求发生在服务器“内部”，因此它不包含用户的浏览器 cookie，也不传递来自获取响应的 cookie。

```vue
``app.vue
	<script setup>
	const headers = useRequestHeaders(['cookie'])
	const { data } = await useFetch('/api/me', { headers })
</script>
``
```

​	在将标头代理到外部 API 之前要非常小心，并且只包含您需要的标头。并非所有标头都可以安全绕过，并且可能会引入不需要的行为。以下是不被代理的常见标头列表：

- `host`,`accept`
- `content-length`, `content-md5`,`content-type`
- `x-forwarded-host`, `x-forwarded-port`,`x-forwarded-proto`
- `cf-connecting-ip`,`cf-ray`



#### 多次调用

如果你想使用多个异步操作，比如多次调用`useFetch`，你需要`<script setup>`在设置结束时一起使用或等待它们。

```vue
··app.vue
<script>
export default defineComponent({
  async setup() {
    const [{ data: organization }, { data: repos }] = await Promise.all([
      useFetch(`https://api.github.com/orgs/nuxt`),
      useFetch(`https://api.github.com/orgs/nuxt/repos`)
    ])

    return {
      organization,
      repos
    }
  }
})
</script>

<template>
  <header>
    <h1>{{ organization.login }}</h1>
    <p>{{ organization.description }}</p>
  </header>
</template>
··
```



### 状态管理

​	Nuxt 提供了`useState`可组合项来创建跨组件的响应式和 SSR 友好的共享状态。

`	useState`是一个 SSR 友好的替代品。它的值将在服务器端渲染后（在客户端水合作用期间）保留，并使用唯一密钥在所有组件之间共享。

```typescript
··composables/states.ts
export const useCounter = () => useState<number>('counter', () => 0)
export const useColor = () => useState<string>('color', () => 'pink')
··
```

```vue
``pages/statePage.vue
<script setup>
const color = useColor() // 与useState('color')相同。
const counter = useCounter() // 与useState('counter')相同。

</script>
<template>
  <p>Current color: {{ color }}</p>
  <button @click="counter++">
      +
    </button>
    <button @click="counter--">
      -
    </button>
    <p>Current counter: {{ counter }}</p>
</template>
``
```

#### 使用第三方库

​	Nuxt**过去依赖**Vuex 库来提供全局状态管理。如果您从 Nuxt 2 迁移，请前往[迁移指南](https://nuxt.com/docs/migration/configuration#vuex)。

​	Nuxt 对状态管理没有意见，因此请随意选择适合您需求的解决方案。与最流行的状态管理库有多种集成，包括：

- [Pinia](https://nuxt.com/modules/pinia) ——Vue 官方推荐
- [Harlem](https://nuxt.com/modules/harlem) - 不可变的全局状态管理
- [XState](https://nuxt.com/modules/xstate) - 状态机方法，带有用于可视化和测试状态逻辑的工具
