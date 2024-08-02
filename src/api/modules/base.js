import { get, post } from "../index.js";

const getMock = async (mockFileName) => (await import(`@/mock/${mockFileName}.json`)).default;

// Node服务器测试
export const nodeTest = (params) => {
  return get("/nodeTest", params);
};

// 登录(Mock)
export const login = (data) => {
  const response = {
    headers: { "content-type": "mock" },
    status: 200,
    statusText: "OK",
    data: getMock("loginMock"),
  };
  return Promise.resolve(response.data);
  // return post("/login", data);
};

// 动态路由(Mock)
export const getRoutes = (data) => {
  const response = {
    headers: { "content-type": "mock" },
    status: 200,
    statusText: "OK",
    data: getMock("routesMock"),
  };
  return Promise.resolve(response.data);
  // return post("/getRoutes", data);
};
