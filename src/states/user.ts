import {userType} from "../models/user";

let currentUser: userType;
const getCurrentUserState = (): userType => {
    return currentUser;
}

const setCurrentUserState = (user: userType) => {
    currentUser = user
}

export {
    getCurrentUserState,
    setCurrentUserState,
}