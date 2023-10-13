/**
 * 帖子类别
 */
export type portType = {
    id: number;
    img?:string;
    title: string;
    content: string;
    tags: string;
    thumbNum: number;
    favourNum: string;
    userId: string;
    createTime:Date;
};