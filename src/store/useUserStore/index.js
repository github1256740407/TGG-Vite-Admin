// 主题样式
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      token: null,
      account: null,
    };
  },
  actions: {
    logOut: () => {
      localStorage.clear();
      window.location.reload();
    },
  },
  // 开启本地缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, // 表示存储在localStorage
        paths: ["token", "account"],
      },
    ],
  },
});
