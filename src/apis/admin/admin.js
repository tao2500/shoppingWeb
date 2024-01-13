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

// 员工管理
export function getAllStaffs() {
    return request({
        url: '/pharmacist/selectedAll',
        method: 'get',
    })
}

export const getByTelephone = params => {
    return request({
        url: `/pharmacist/selectedById`,
        params,
        method: 'get'
    })
}

export const editS = params => {
    return request({
        url: `/pharmacist/upDate`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const addS = params => {
    return request({
        url: `/pharmacist/addTwo`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const delS = params => {
    return request({
        url: `/pharmacist/delete`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

// 会员管理
export function getAllCustomer() {
    return request({
        url: '/customer/selectedAll',
        method: 'get',
    })
}

export const getByCTelephone = params => {
    return request({
        url: `/customer/selectedByTelephone`,
        params,
        method: 'get'
    })
}

export const addC = params => {
    return request({
        url: `/customer/addTwo`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const editC = params => {
    return request({
        url: `/customer/upDate`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const delC = params => {
    return request({
        url: `/customer/delete`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

// 运费管理
export function getAllFreight() {
    return request({
        url: '/freight/selectedAll',
        method: 'get',
    })
}

export function addD (params) {
    return request({
        url: `/freight/addTwo`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const editD = params => {
    return request({
        url: `/freight/upDataFreight`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export const delD = params => {
    return request({
        url: `/freight/deleteFreight`,
        data: params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
