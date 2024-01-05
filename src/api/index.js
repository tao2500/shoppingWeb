import request from '../utils/http.js';

// const token = localStorage.getItem('token') || '';

/*
返回目前使用的域名
 */
export const funcGetDomain = () => {
    return 'http://localhost:8080/shopping/';
};

// 添加应用
export const addApps = params => {
    return request({
        url: '/apisaas_add_app',
        params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
