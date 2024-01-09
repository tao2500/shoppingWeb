import request from '../../utils/http.js';

export function getAllDrugs() {
  return request({
    url: '/drugs/selectedAll',
    method: 'get',
  })
}

export const getDrugByName = params => {
    return request({
        url: `/drugs/selectedByName`,
        params,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
