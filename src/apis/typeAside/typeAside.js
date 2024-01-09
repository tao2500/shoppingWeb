import request from '../../utils/http.js';

export const getAllType = params => {
    return request({
        url: '/drugs/selectedAllType',
        method: 'get',
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getByType = params => {
    return request({
        url: '/drugs/selectedByType',
        params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}
