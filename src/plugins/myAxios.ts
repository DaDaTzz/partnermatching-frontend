// 创建实例时配置默认值
import axios from "axios";


const myAxios = axios.create({
    // baseURL:'http://8.130.133.165:8080/api',
    // baseURL:'http://www.iyaya.icu:8080/api',
    baseURL: 'http://localhost:8080/api',

});


myAxios.defaults.withCredentials = true;


// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        // 将 token 添加到请求头中
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    });

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    //跳转到登录页
    if (response?.data.code === 40003 || response?.data.code === 40006) {
        // const redirectUrl = window.location.href;
        window.location.href = '/user/login'
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});
export default myAxios;
