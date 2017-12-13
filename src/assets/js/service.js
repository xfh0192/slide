import request from './request'



export const getApi = (query) => request('/api', 'get', {
    query1: query.param1,
    query2: query.param2
})

export const postData = (data) => request('/post', 'post', data)