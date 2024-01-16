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
