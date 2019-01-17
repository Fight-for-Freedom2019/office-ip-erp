import axios from 'axios'
//请求参数配置 参照npm axios API
export default axios.create({
  baseURL: process.env.API_BASEURL,//only work at development mode,doesn't infect production mode  
});