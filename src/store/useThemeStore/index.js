// 主题样式
import { defineStore } from "pinia";

export const useThemeStore = defineStore("themeStore", {
  state: () => {
    return {
      theme: "dark", // 主题名称 auto | dark
      layoutMode: "MixMode", // 布局模式 MixMode | LeftMode| TopMode | ModularMode
      collapse: false, // 是否收缩菜单
    };
  },
  // 开启本地缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, //表示存储在localStorage
        paths: ["theme", "layoutMode", "collapse"],
      },
    ],
  },
});

// 初始化主题样式(不附带动画效果, 动画效果在组件内添加)
export const initThemeStyle = (theme) => {
  // Web Api丝滑过渡效果
  return document.startViewTransition(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
};
