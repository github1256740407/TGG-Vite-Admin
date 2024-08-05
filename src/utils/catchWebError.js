/**
 * @description: 文件说明: 用于捕获前端各种异常报错, 支持上传错误信息于服务端
 */

// 发送异常日志
const sendErrorLog = (system, baseUrl, errorStack) => {
  const page = encodeURIComponent(window.location.href);
  const token = localStorage.getItem("token");
  const error = encodeURIComponent(errorStack);
  // 浏览器高级API sendBeacon, 优先级比起传统的请求低, 不占用浏览器并发量限制数
  const url = `${baseUrl}/sendErrorLog?system=${system}&page=${page}&token=${token}&error=${error}`
  // navigator.sendBeacon(url);
  console.log(url)
};

export default {
  /**
   * @description: 初始化前端异常捕获
   * @param {String} system 系统名称
   * @param {String} baseUrl 上报请求基础地址
   */
  init: (system = "TGG-Vite", baseUrl) => {
    if (!system || !baseUrl) return new Error("[前端异常捕获]: 初始化失败, 请检查入参");
    console.log(`%c[前端异常捕获]: 初始化成功-${system}`, "color: green");
    // 1.JavaScript错误监控
    window.addEventListener("error", (event) => {
      if (event.error?.stack) {
        sendErrorLog(system, baseUrl, event.error.stack);
      } else {
        const errorJson = JSON.stringify(event.error, Object.getOwnPropertyNames(event.error), 2);
        sendErrorLog(system, baseUrl, errorJson);
      }
    });
    // 2.Promise错误监控
    window.addEventListener("unhandledrejection", (event) => {
      event.reason?.stack && sendErrorLog(system, baseUrl, event.reason.stack);
    });
  },
};
