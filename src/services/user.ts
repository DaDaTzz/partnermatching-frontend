import myAxios from "../plugins/myAxios.ts";

/**
 * 获取当前登录用户
 */
export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState();
    // if(currentUser){
    //    return currentUser;
    // }
    // 不存在则从远程获取
    const res = await myAxios.get('/user/current');
    if(res.data.code === 200){
        // setCurrentUserState(res.data.data)
        return res.data.data;
    }
    return null;


}

