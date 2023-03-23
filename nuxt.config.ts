import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    //配置别名
    images: fileURLToPath(new URL("./assets/images", import.meta.url)),
    style: fileURLToPath(new URL("./assets/style", import.meta.url)),
    data: fileURLToPath(new URL("./assets/other", import.meta.url)),
  },

  runtimeConfig: {
    //运行时的配置
    apiSecret: "abcdefg", //私钥  只能在服务器端使用的私钥
    public: {
      apiBase: "/api", //公众号内的密钥也会在客户端曝光
    },
  },

  vite: {
    //全局样式导入
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/colors.scss" as *;',
        },
      },
    },
  },

  //html头部配置--的整个应用程序定制头部
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

  


});
