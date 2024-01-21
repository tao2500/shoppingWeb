import request from '../../utils/http.js';


// medicine
export  function addShoppingCart(params) {
    return request({
        url: '/shoppingCart/addShoppingCart',
        method: 'post',
        data: params
    })
}

export  function deleteShoppingCart(params) {
    return request({
        url: '/shoppingCart/deleteShoppingCart',
        method: 'post',
        data: params
    })
}

export function changeCount(params) {
    return request({
        url: '/shoppingCart/changeCount',
        method: 'post',
        data: params
    })
}


// myCart
export function getMyCart(params) {
    return request({
        url: '/shoppingCart/getMyShoppingCart',
        method: 'post',
        params,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getDrugByBarCode(params) {
    return request({
        url: '/shoppingCart/selectedDrugByBarCode',
        method: 'post',
        data: params,
        headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 根据城市获取快递运费
export function selectedFreight(params) {
    return request({
        url: '/freight/selectedFreight',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 查询该城市是否支持跑腿
export function selectedRun(params) {
    return request({
        url: '/freight/canRunErrands',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 查询当前顾客该药品已加购个数
export function getMyCartDrugsCount(params) {
    return request({
        url: '/shoppingCart/getMyCartDrugsCount',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
