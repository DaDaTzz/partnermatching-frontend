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
    favourNum: number;
    userId: string;
    createTime:Date;
    hasThumb:boolean;
    hasFavour:boolean;
    commentNum?:number;
    postCommentUserVOs;
    postComments;
};