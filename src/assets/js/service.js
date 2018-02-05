import request from './request'



export const getApi = (query) => request('/api', 'get', {
    query1: query.param1,
    query2: query.param2
})

export const postData = (data) => request('/post', 'post', data)

// sql
export const getUsers = () => request('/sql/user/get', 'get')

export const setUser = (data) => request('/sql/user/set', 'post', data)

export const loginUser = (data) => request('/sql/user/login', 'post', data)

// fs
// 写入新文件（如有文件，则覆盖）
export const setFile = (data) => request('/fs/file/set', 'post', data)
// 获取某一个文件
export const getFile = (data) => request('/fs/file/get', 'get', data)
// 获取文件列表
export const getFileList = (data) => request('/fs/file/list/get', 'get', data)
// 删除文件
export const removeFile = (data) => request('/fs/file/remove', 'post', data)
// 删除所有文件
export const clearDir = (data) => request('/fs/file/dir/clear', 'post', data)

// mongo
export const login = (data) => request('/mongo/user/login', data)

export const regist = (data) => request('/mongo/user/regist', data)