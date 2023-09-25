import {userType} from "./user";

/**
 * 队伍类别
 */
export type teamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    states: number;
    createTime: Date;
    updateTime: Date;
    // 创建人
    createUser?: userType;
    // 已加入用户
    joinUsers?:userType[];
    // 已加入人数
    hasJoinNum:number;
};