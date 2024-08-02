/**
 * @description: 路由跳转加载的顶部进度条
 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
});

export default {
  // 开始加载
  startLoad: () => NProgress.start(),
  // 结束加载
  endLoad: () => NProgress.done(),
};
