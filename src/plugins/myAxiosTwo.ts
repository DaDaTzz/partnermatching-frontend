// 创建实例时配置默认值
import axios from "axios";


const myAxiosTwo = axios.create({
    // baseURL:'http://8.130.133.165:8080/api',
    // baseURL:'http://www.iyaya.icu:8080/api',

});


myAxiosTwo.defaults.withCredentials = false;


export default myAxiosTwo;
