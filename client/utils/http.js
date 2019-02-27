import axios from 'axios';

// axios.interceptors.response.use(function(response){
//   return response.data
// }, function(err){
//   return Promise.reject(err)
// })

const API_BASE = process.env.API_BASE || ''

console.log('API_BASE', API_BASE)

export const get = (url, params) => {
  console.log('API_BASE', `${API_BASE}${url}`)
  return axios.get(`${API_BASE}${url}`, {
    params
  })
}

export const post = (url, data) => {
  return axios.post(`${API_BASE}${url}`, data)
}