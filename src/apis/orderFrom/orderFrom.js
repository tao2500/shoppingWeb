import request from '../../utils/http.js';

export  function addOrderFroms(params) {
    return request ({
        url: '/orderFrom/addOrderFrom',
        method: 'post',
        data: params
    })
}
