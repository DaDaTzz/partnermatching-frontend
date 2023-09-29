// 创建实例时配置默认值
import axios from "axios";
import { useRouter} from "vue-router";

const router = useRouter()

const myAxios = axios.create({
    //baseURL:'http://8.130.133.165:8080',
    baseURL: 'http://localhost:8080',
});

myAxios.defaults.withCredentials = true;


// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    // 将 token 添加到请求头中
    config.headers.Authorization = `${token}`;
    return config;
    },
    function (error) {
        return Promise.reject(error);
    });

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    //跳转到登录页
    if(response?.data.code === 40003){
        // const redirectUrl = window.location.href;
        window.location.href = '/user/login'
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});
export default myAxios;