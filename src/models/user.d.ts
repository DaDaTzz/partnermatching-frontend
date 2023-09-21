/**
 * 用户类别
 */
export type userType = {
    id: number;
    nickname: string;
    loginAccount: string;
    loginPassword: string;
    sex: number;
    phone: string;
    email: string;
    tags: string;
    states: number;
    profilePhoto?: string;
    profile?: string;
    createTime: Date;
    type: number;
};