# TGG-Vite-Admin 管理端模板(纯净版)
在线预览演示网址: https://github1256740407.github.io/TGG-Vite-Admin/#/Login

开发者: 叶花弈

主要技术: Vue3 + Vite + Element-plus + Axios + Pinia + Sass
# ---- 已有功能:
1. 异常捕获: 全局捕获页面内异常报错, 支持上传错误记录生成日志
2. 发布提示: 提示用户前端项目有更新, 建议刷新页面
3. 环境切换: 开发、测试、生产环境一键切换的命令行工具以及命令

4. 路由菜单: 自动处理动态路由和菜单, 内含Mock示例数据
5. 网络请求: Axios请求方式, 拦截器封装, 错误统一处理
6. 状态存储: Pinia的封装 + 持久化

7. 样式配置: 动态黑白版 + 页面布局 + 菜单效果样式配置(收缩, 联动高亮, 颜色...)
8. 刷新白屏: 已进行兼容黑白版的动画优化
9. 切换路由: 页面进度条加载
# ---- 项目启动:
```
1. 拉取项目代码
2. npm install
3. npm run start 后续根据命令行内提供的选项回车即可
```
# ---- 目录结构:
```
├─.vscode
├─public
└─src
    ├─api         #接口
    ├─assets      #静态资源(图标, 图片, 基础样式)
    ├─components  #公共组件
    ├─layout      #布局模式容器 + 异常页面
    ├─mock        #模拟数据
    ├─router      #路由
    ├─store       #全局数据状态管理
    ├─utils       #工具函数
    ├─views       #页面
    │ App.vue     #根组件
    │ main.js     #项目入口文件
│ .gitignore
│ env.js          #项目环境配置 + 命令行工具
│ index.html
│ package-lock.json
│ package.json
│ README.md
│ vite.config.js
```