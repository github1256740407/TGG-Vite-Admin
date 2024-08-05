/**
 * @description: 网络请求方法: 基于Axios的封装, 抛出get, post方法
 */
import Axios from "axios";
import { ElMessage } from "element-plus";

// 默认配置
const defaultConfig = {
  timeout: 10000, // 超时时间
  handleReq: null, // 自定义[请求]拦截器
  handleRes: null, // 自定义[响应]拦截器(status正常, code异常)
  handleError: null, // 自定义[响应]拦截器(status异常)
};
// 请求分发标识(用于解决浏览器接口同IP并发6个的限制)
let apiBaseUrlFlag = true;
// 基础地址
const getApiBaseUrl = ({ VITE_API_BASE_URL, VITE_API_BASE_URL2 }) => {
  if (!VITE_API_BASE_URL2) return VITE_API_BASE_URL;
  apiBaseUrlFlag = !apiBaseUrlFlag;
  return apiBaseUrlFlag ? VITE_API_BASE_URL : VITE_API_BASE_URL2;
};

/**
 * @description: 初始化
 * @param {Object} env 环境变量对象
 * @param {Number} config.timeout 请求超时时间
 */
const initRequest = (env, config) => {
  const { timeout, handleReq, handleRes, handleError } = Object.assign(defaultConfig, config);
  // 1. 创建实例
  const instance = Axios.create({ responseType: "json", timeout });
  // 2. 封装拦截器
  instance.interceptors.request.use((request) => {
    handleReq instanceof Function && handleReq(request);
    return request;
  });
  instance.interceptors.response.use(
    (response) => {
      const { data, config, status } = response;
      // 特殊类型: blob
      if (config.responseType === "blob") return Promise.resolve(data);
      /**
       * @description: 接口状态码判断
       * 1. [200 || 自定义拦截器处理, 且返回true(有些特殊code根据项目前后端需要,可能非200也视作正常)] => 正常, 返回响应数据, 不提示
       * 2. 不满足以上条件, 视作异常抛出, 提示
       */
      if (data.code === 200 || (handleRes instanceof Function && handleRes(response))) {
        return Promise.resolve(data);
      } else {
        ElMessage.error(data.message);
        return Promise.reject(
          new Error(`接口异常-${data.message} status: ${status} 
          接口: ${config.url} 
          入参: ${JSON.stringify(config.method === "post" ? config.data : config.params)}
          返参: ${JSON.stringify(data)}`)
        );
      }
    },
    (error) => {
      const { response = {}, config = {}, message } = error;
      handleError instanceof Function && handleError(error);
      ElMessage.error(message);
      return Promise.reject(
        new Error(`服务器异常-${message} status: ${response.status}
          接口: ${config.url} 
          入参: ${JSON.stringify(config.method === "post" ? config.data : config.params)}`)
      );
    }
  );
  // 3. 返回封装的请求方法
  return {
    get: (url, params = {}, config = {}) => {
      return instance({
        method: "get",
        url: `${getApiBaseUrl(env)}${url}`,
        params,
        ...config,
      });
    },
    post: (url, data = {}, config = {}) => {
      return instance({
        method: "post",
        url: `${getApiBaseUrl(env)}${url}`,
        data,
        ...config,
      });
    },
  };
};

export default initRequest;
