/**
 * @description: vite自定义插件 - 创建前端项目版本
 */
import path from "path";
import fsExtra from "fs-extra";

export default () => {
  return {
    name: "createVersion",
    // 生命周期: 打包前
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
    configureServer() {
      console.log('触发了插件的生命周期啊啊啊啊啊')
    }
  };
};
