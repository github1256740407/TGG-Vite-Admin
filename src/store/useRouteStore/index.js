// 动态路由, 菜单的全局存储
import { defineStore } from "pinia";

export const useRouteStore = defineStore("routeStore", {
  state: () => {
    return {
      data: [], // 动态路由原始数据
    };
  },
  getters: {
    // 扁平化路由 => 提供给addRoute使用
    routeData: ({ data }) => handleRouteData(data),
    // 菜单化路由 => 提供给菜单生成使用
    menuData: ({ data }) => handleMenuData(data),
  },
  actions: {},
});

// 将动态路由原始数据进行扁平化处理
const handleRouteData = (data) => {
  // JSON序列化是为了保证递归时, 不会修改原始数组
  return JSON.parse(JSON.stringify(data)).reduce((result, item) => {
    // 如果children非空数组, 则递归
    if (item.children?.length) {
      result = [...result, ...handleRouteData(item.children)];
    }
    // 如果children为空数组, 或者undefined, 则直接添加
    else {
      delete item.children;
      result.push({
        name: item.name,
        path: `/Layout/${item.path}`,
        meta: item.meta ?? {},
        component: item.component,
      });
    }
    return result;
  }, []);
};
// 将动态路由原始数据进行菜单化处理
const handleMenuData = (data) => {
  // JSON序列化是为了保证递归时, 不会修改原始数组
  return JSON.parse(JSON.stringify(data)).reduce((result, item) => {
    item.path = `/Layout/${item.path}`;
    // 保留meta.isHidden为false的
    if (!item.meta.isHidden) {
      // 1.如果children非空数组, 则递归过滤
      if (item.children?.length) {
        item.children = handleMenuData(item.children);
      }
      result.push(item);
    }
    return result;
  }, []);
};
