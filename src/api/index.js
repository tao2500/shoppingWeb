import request from '../utils/index.js';

// const token = localStorage.getItem('token') || '';

/*
返回目前使用的域名
 */
export const funcGetDomain = () => {
    return 'http://localhost:8080';
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
