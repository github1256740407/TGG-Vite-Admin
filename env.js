import inquirer from "inquirer";
import { exec } from "child_process";

// 运行项目: start, 打包发布: publish
const command = process.argv[2];

const { ENV } = await inquirer.prompt({
  name: "ENV",
  type: "list",
  message: command === "start" ? "选择项目运行环境: " : "请选择项目部署环境: ",
  choices: command === "start" ? ["开发环境", "测试环境", "线上环境"] : ["测试环境", "线上环境"],
  default: "开发环境",
});

// 环境变量
Object.assign(process.env, {
  // VITE_PROJECT_NAME: "《TGG》官方网站 - TieGanGan", // 项目名称
  VITE_PROJECT_NAME: "TGG-Vite-Admin",
  VITE_API_BASE_URL: null, // 项目接口基础地址(主)
  VITE_API_BASE_URL2: null, // 项目接口基础地址(副)
  VITE_PORT: "8000", // 项目启动端口号
  VITE_OPEN: true, // 是否自动打开浏览器
});

switch (ENV) {
  case "开发环境":
    process.env.VITE_API_BASE_URL = "http://127.0.0.1:7001";
    break;
  case "测试环境":
    process.env.VITE_API_BASE_URL = "http://127.0.0.1:7001";
    break;
  case "线上环境":
    process.env.VITE_API_BASE_URL = "http://127.0.0.1:7001";
    break;
}

// 项目运行
if (command === "start") {
  const run = exec("vite");
  console.log("\x1b[32m", ` √ 命令已下达, 正在执行中Loading...`)
  run.stdout.on("data", (data) => console.log(`  ${data.trim()}`));
  run.stderr.on("data", (data) => console.error(data));
}
// 项目部署
else if (command === "publish") {
  console.log("暂不支持捏~");
}
