import request from '../../utils/http.js';

export  function addOrderFroms(params) {
    return request ({
        url: '/orderFrom/addOrderFrom',
        method: 'post',
        data:params,
        headers: {
            'Content-Type': 'application/json' // 设置请求头的类型为JSON
            // 'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export  function playOKK(params) {
    return request ({
        url: '/orderFrom/playOk',
        method: 'post',
        data:params,
        headers: {
            // 'Content-Type': 'application/json' // 设置请求头的类型为JSON
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export  function getMyOrderFromList(params) {
    return request ({
        url: '/orderFrom/selectedByCustomerId',
        method: 'get',
        params,
    })
}

export  function upDataOrderFromStatus(params) {
    return request ({
        url: '/orderFrom/upDataOrderFromStatus',
        method: 'post',
        data:params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export  function upDataOrderFrom(params) {
    return request ({
        url: '/orderFrom/upDataOrderFrom',
        method: 'post',
        data:params,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export  function deleteOrderFrom(params) {
    return request ({
        url: '/orderFrom/deleteOrderFrom',
        method: 'post',
        data:params,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
