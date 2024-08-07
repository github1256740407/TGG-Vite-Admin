/**
 * @description: vite自定义插件 - 创建前端项目版本
 */
import path from "path";
import fsExtra from "fs-extra";

export default () => {
  return {
    name: "createVersion",
    buildStart() {
      try {
        const filePath = path.resolve(process.cwd(), "public/version.json");
        const fileContent = { version: new Date().getTime() };
        fsExtra.outputJson(filePath, fileContent, (error) => {
          if (error) {
            throw new Error("× 版本号写入失败", error);
          } else {
            console.log("\x1b[32m", `√ 版本号文件成功生成`);
          }
        });
      } catch (error) {
        throw new Error("× 版本号写入失败", error);
      }
    },
    transformIndexHtml(html) {
      return html.replace(
        "</body>",
        `<script>
          // ================================================================
          // 1. 创建Tip的DOM
          const tipDom = document.createElement("div");
          const tipDomStyle = "width: 240px; padding: 10px 0; padding-left: 40px; border-radius: 6px; opacity: 0; color: #606266; background-color: white; position: fixed; right: -300px; top: 100px; transition: 0.3s;";
          tipDom.id = "create-version-tip";
          tipDom.innerText = "系统已有更新, 请刷新页面!";
          tipDom.style = tipDomStyle;

          // 2. 创建Close的DOM
          const closeDom = document.createElement("div");
          closeDom.innerText = "×";
          closeDom.style = "position: absolute; top: 10px; right: 10px; cursor: pointer;";
          closeDom.onclick = () => tipDom.style = tipDomStyle + "opacity: 1; right: -300px;";

          // 2. 创建icon的DOM
          const iconDom = document.createElement("div");
          iconDom.innerText = "!";
          iconDom.style = "width: 20px; height: 20px; text-align: center; border-radius: 50%; background-color: #e6a23c; color: white; position: absolute; top: 10px; left: 10px;";

          // 3. 插入DOM
          tipDom.appendChild(iconDom);
          tipDom.appendChild(closeDom);
          document.body.appendChild(tipDom);
          // ================================================================
          const debounce = (callBack, delay = 500, immediate = false) => {
            let timer = null;
            return function (...args) {
              clearTimeout(timer);
              if (immediate) {
                const runNow = !timer;
                timer = setTimeout(() => {
                timer = null;
              }, delay);
              if (runNow) {
                  callBack.apply(this, args);
                }
              } else {
                timer = setTimeout(() => {
                  callBack.apply(this, args);
                }, delay);
              }
            };
          };
          const checkWebVersion = debounce(async () => {
            try {
              const base = window.location.origin + window.location.pathname;
              const url = base + "version.json?v=" + new Date().getTime();
              const res = await fetch(url);
              const { version } = await res.json();
              const localVersion = localStorage.getItem("version");
              if (!localVersion) {
                localStorage.setItem("version", version);
                return;
              }
              if (Number(localVersion) !== version) {
                console.log('版本不一样')
                tipDom.style = tipDomStyle + "opacity: 1; right: 20px;";
                localStorage.setItem("version", version);
              }
            } catch (error) {
              throw new Error(error);
            }
          });
          const oldOpen = XMLHttpRequest.prototype.open;
          XMLHttpRequest.prototype.open = function (method, url) {
            checkWebVersion();
            oldOpen.apply(this, arguments);
          };
        </script></body>`
      );
    },
  };
};
