<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import mockCaptcha from "@/utils/mockCaptcha.js";
import { useUserStore } from "@/store/useUserStore";
import { login } from "@/api/modules/base.js";

const userStore = useUserStore();
const router = useRouter();

const ruleFormRef = ref(null);
const ruleForm = reactive({
  account: null,
  password: null,
  captcha: null,
});
const rules = reactive({
  account: [{ required: true, message: "账号不能为空", trigger: ["blur", "change"] }],
  password: [{ required: true, message: "密码不能为空", trigger: ["blur", "change"] }],
  captcha: [{ required: true, message: "验证码不能为空", trigger: ["blur", "change"] }],
});

// 登录
const submitForm = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate(async (valid, fields) => {
    if (!valid) return;
    const { body } = await login(ruleForm.value);
    userStore.$patch({ token: body.token, account: body.account });
    router.push("Layout");
  });
};
// 忘记密码
const forgetPassword = () => {
  ElMessageBox.alert("该项目为Mock类, 仅作为模板使用, 无具体校验, 如有需要自行调整逻辑", "忘记密码", {
    confirmButtonText: "确认",
    callback: (action) => {},
  });
};

onMounted(() => {
  // 模拟: JS生成验证码图片
  mockCaptcha("canvasId", 4);
});
</script>

<template>
  <div id="Login">
    <div class="main">
      <div class="left">
        <img class="logo" src="@/assets/images/login-main-left-logo.png" alt="img" />
        <img class="changli1" src="@/assets/images/login-main-left-changli1.png" alt="img" />
        <img class="changli2" src="@/assets/images/login-main-left-changli2.png" alt="img" />
      </div>
      <div class="right">
        <div class="title">TGG-Vite-Admin</div>
        <div class="tip">
          <span>Vite + Vue3 + Pinia + Element-plus</span>
          <br />
          <span>简易清晰的项目结构, 基础功能全面, 易上手, 推荐项目初始化时快速启用</span>
        </div>
        <div class="rowLine1"></div>
        <div class="rowLine2"></div>
        <!-- <div class="tip">Vue3 + Vite + Element-Plus ,清晰功能,易上手</div> -->
        <!-- 登录表单 -->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <!-- 账号 -->
          <el-form-item prop="account">
            <el-input v-model="ruleForm.account" placeholder="请输入账号" size="large">
              <template #prepend>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
              size="large"
              show-password
              autocomplete="new-password"
            >
              <template #prepend>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="captcha">
            <el-input v-model="ruleForm.captcha" placeholder="请输入验证码" size="large">
              <template #append>
                <canvas
                  id="canvasId"
                  width="70px"
                  height="32px"
                  title="点击canvas随机生成验证码"
                  @click="mockCaptcha('canvasId')"
                />
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button class="login" type="primary" size="large" @click="submitForm">登录</el-button>
        <el-button class="forgetPassword" type="primary" link @click="forgetPassword"> 忘记密码 </el-button>
        <ThemeSwitch class="themeSwitch" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#Login {
  width: 100vw;
  height: 100vh;
  background-color: #fafcff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("@/assets/images/login-page-bg.jpg");
  .main {
    width: 1100px;
    height: 600px;
    border-radius: 16px;
    box-shadow: 0 0 6px rgb(249, 213, 34);
    background-color: var(--el-bg-color);
    display: flex;
    overflow: hidden;
    transition: 0.5s;
    .left {
      width: 50%;
      height: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(37, 35, 32);
      position: relative;
      .logo {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 1;
        opacity: 0;
        transition: 0.6s;
      }
      .changli1 {
        width: 1000px;
        position: absolute;
        top: -54px;
        z-index: 2;
        transition: 0.6s;
      }
      .changli2 {
        width: 1000px;
        position: absolute;
        top: -54px;
        right: -1000px;
        z-index: 2;
        opacity: 0;
        transition: 0.6s;
      }
    }
    .right {
      width: 50%;
      height: 100%;
      box-sizing: border-box;
      padding: 40px 40px;
      background-color: rbg(236, 239, 244);
      position: relative;
      .title {
        font-size: 30px;
        font-weight: bold;
      }
      .tip {
        font-size: 14px;
        color: #73767a;
        margin-top: 10px;
        margin-bottom: 120px;
      }
      .rowLine1 {
        width: 470px;
        height: 2px;
        background-color: #73767a;
        position: absolute;
        top: 150px;
      }
      .rowLine2 {
        width: 0;
        height: 2px;
        background-color: #79bbff;
        position: absolute;
        top: 150px;
        transition: 0.6s;
      }
      .el-icon {
        font-size: 20px;
      }
      :deep(.el-input-group__append) {
        background-color: #f4f4f5;
        cursor: pointer;
        transition: 0.5s;
        &:hover {
          box-shadow: 0 1px 0 0 var(--el-input-border-color) inset, 0 -1px 0 0 var(--el-color-primary) inset,
            -1px 0 0 0 var(--el-input-border-color) inset;
        }
      }
      .login {
        width: 100%;
      }
      .forgetPassword {
        margin-top: 20px;
        float: right;
      }
      .themeSwitch {
        position: absolute;
        bottom: 20px;
        right: 40px;
      }
    }
    &:hover {
      box-shadow: 0 0 6px #79bbff;
      .logo {
        opacity: 1;
      }
      .changli1 {
        opacity: 0;
      }
      .changli2 {
        right: -300px;
        opacity: 1;
      }
      .rowLine2 {
        width: 470px;
      }
    }
  }
}
</style>
