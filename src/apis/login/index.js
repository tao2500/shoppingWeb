import request from '../../utils/http.js';

/*
返回目前使用的域名
 */
export const funcGetDomain = () => {
    return 'http://localhost:8080/shopping/';
};

export const customerLogin = params => {
    return request({
        url: '/customer/login',
        params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const adminLogin = params => {
    return request({
        url: '/pharmacist/login',
        params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const addCustomer = params => {
    return request({
        url: '/customer/addTwo',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
