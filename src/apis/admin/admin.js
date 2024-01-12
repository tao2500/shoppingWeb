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

// 订单管理
export function getAllOrders() {
    return request({
        url: '/orderFrom/selectedAll',
        method: 'get',
    })
}

export const getByStatu = params => {
    return request({
        url: `/orderFrom/selectedByStatus`,
        params,
        method: 'get'
    })
}

export const sendO = params => {
    return request({
        url: `/orderFrom/upDataOrderFrom`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const delO = params => {
    return request({
        url: `/orderFrom/deleteOrderFrom`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
