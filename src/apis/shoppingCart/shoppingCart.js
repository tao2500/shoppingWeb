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

export   function changeCount(params) {
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
