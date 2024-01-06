import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
    baseURL: "/api",
    timeout: 30000,
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // config.headers.code = "8a12d7de6c02c77468b45cdb958b475";
        // if (store.getters.token) {
        //   // 如果token存在 注入token
        //   config.headers.Authorization = `Bearer ${store.getters.token}`;
        // }
        return config; // 必须返回配置
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // console.log('[ response ] >', response, response);

        if (response.data.state === 0) {
            ElMessage.error(response.data.msg);
        }
        return response.data;
        // const { success, message, data } = response.data;
        //   要根据success的成功与否决定下面的操作
        // if (success) {
        //   return data;
        // } else {
        //   $message("warn", message);
        //   // TODO：业务错误
        //   return Promise.reject(new Error(message));
        // }
    },
    error => {
        // 处理 token 超时问题
        // if (
        //   error.response &&
        //   error.response.data &&
        //   error.response.data.code === 401
        // ) {
        //   // TODO: token超时
        //   store.dispatch("user/logout");
        // }
        // $message("error", error.response.data.message);
        // TODO: 提示错误消息
        ElMessage.error(error);
        return Promise.reject(error);
    }
);

export default service;
