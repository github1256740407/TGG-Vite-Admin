// 主题样式
import { defineStore } from "pinia";

export const useThemeStore = defineStore("themeStore", {
  state: () => {
    return {
      theme: "dark", // 主题名称 auto | dark
      layoutMode: "MixMode", // 布局模式 MixMode | LeftMode| TopMode | ModularMode
      collapse: false, // 菜单是否收缩
      lightParentMenu: false, // 父菜单是否高亮
    };
  },
  actions: {
    // 修改: 菜单是否收缩
    setCollapse(value){
      this.collapse = value;
      if (value) {
        document.documentElement.style.setProperty("--custom-aside-width", "66px");
      } else {
        document.documentElement.style.setProperty("--custom-aside-width", "200px");
      }
    },
    // 修改: 父菜单是否高亮
    setLightParentMenu(value) {
      this.lightParentMenu = value;
    }
  },
  // 开启本地缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, //表示存储在localStorage
        paths: ["theme", "layoutMode", "collapse", "highlightParentMenu"],
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
