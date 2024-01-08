import request from '../../utils/http.js';

export const editCustomer = params => {
    return request({
        url: '/customer/upDate',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
