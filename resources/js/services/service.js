import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: `http://localhost:8000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 15000
})
//start when you start done when you finish (i use interceptors)
 apiClient.interceptors.request.use(config => {
   NProgress.start()
   return config
 })

 apiClient.interceptors.response.use(response => {
   NProgress.done()
   return response
 })
