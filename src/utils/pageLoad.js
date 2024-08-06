/**
 * @description: 页面刷新动画的开始, 结束控制函数
 */
// 开始加载
const startLoad = () => {
  // 1. 获取页面body元素
  const bodyDom = document.body;
  // 2. 创建页面loading元素, 插入至body中
  const pageLoadDom = document.createElement("div");
  pageLoadDom.className = "block-loading";
  pageLoadDom.innerHTML = `
    <div class="block-loading-box">
      <div class="block-loading-box-warp">
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
        <div class="block-loading-box-item"></div>
      </div>
      <div>
        ─────TGG-Vite-Admin─────
      </div>
    </div>
  `;
  bodyDom.insertBefore(pageLoadDom, bodyDom.childNodes[0]);
};
// 结束加载
const endLoad = () => {
  // 1. 获取页面body元素
  const bodyDom = document.body;
  // 2. 获取到页面所有loading元素, 将其从body删除
  const pageLoadDomList = document.querySelectorAll(".block-loading");
  Array.from(pageLoadDomList).forEach((dom) => bodyDom.removeChild(dom));
};

export default {
  // 初始化
  init: () => {
    startLoad();
    window.addEventListener("load", () => endLoad());
  },
};
