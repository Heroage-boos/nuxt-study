export default defineNuxtRouteMiddleware((to, from) => {
  console.log("to", to);
  console.log("from", from);
  if (to.params.id === "1") {
    return abortNavigation(); //停止当前导航
  }
  return navigateTo("/about"); //重定向到给定路径，如果重定向到服务器端将，则将重定向代码设置为found 302
});
