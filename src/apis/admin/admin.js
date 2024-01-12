import request from '../../utils/http.js';

// 药品管理
export function getAllDrugs() {
    return request({
        url: '/drugs/selectedAll',
        method: 'get',
    })
}

export const editM = params => {
    return request({
        url: `/drugs/upDataDrugs`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const addM = params => {
    return request({
        url: `/drugs/addTwo`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const delM = params => {
    return request({
        url: `/drugs/deleteDrugs`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
