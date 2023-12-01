import Index from "../pages/index.vue";
import Team from "../pages/team/team.vue";
import User from "../pages/user/user.vue";
import Search from "../pages/common/search.vue";
import Edit from "../pages/user/edit.vue";
import SearchResult from "../pages/common/searchResult.vue";
import UserLogin from "../pages/user/userLogin.vue";
import teamAdd from "../pages/team/teamAdd.vue";
import teamUpdate from "../pages/team/teamUpdate.vue";
import UserUpdate from "../pages/user/userUpdate.vue";
import UserTeamJoin from "../pages/user/userTeamJoin.vue";
import UserTeamCreate from "../pages/user/userTeamCreate.vue";
import UserRegister from "../pages/user/userRegister.vue";
import UpdateTag from "../pages/user/updateTag.vue";
import UserInfo from "../pages/user/userInfo.vue";
import TeamInfo from "../pages/team/teamInfo.vue";
import PostInfo from "../pages/post/postInfo.vue";
import myPost from "../pages/post/myPost.vue";
import postAdd from "../pages/post/postAdd.vue";
import Message from "../pages/message/Message.vue";
import fans from "../pages/user/fans.vue";
import loves from "../pages/post/loves.vue";
import UploaderAwata from "../pages/user/UploaderAwata.vue";
import UploaderTeamImg from "../pages/team/UploaderTeamImg.vue";
import UpdatePassword from "../pages/user/updatePassword.vue";
import MyFavours from "../pages/post/myFavours.vue";
import bindPhone from "../pages/user/bindPhone.vue";
import postEdit from "../pages/post/postEdit.vue";
import PublicChatRoom from "../pages/message/PublicChatRoom.vue";
import TeamChatRoom from "../pages/message/TeamChatRoom.vue";
import PrivateChatRoom from "../pages/message/PrivateChatRoom.vue";
import ThumbToMe from "../pages/message/ThumbToMe.vue";
import ShoppingMall from "../pages/user/ShoppingMall.vue";
import CreateOrder from "../pages/order/CreateOrder.vue";
import MyOrders from "../pages/order/MyOrders.vue";
import BuyAgain from "../pages/order/BuyAgain.vue";
import OrderInfo from "../pages/order/orderInfo.vue";


const routes = [
    {path: '/', title:'组队鸭',component: Index},
    {path: '/team',  title:'队伍',  component: Team},
    {path: '/team/info',  title:'队伍详情',  component: TeamInfo},
    {path: '/team/add', title:'创建队伍', component: teamAdd},
    {path: '/team/uploadImg', title:'上传封面', component: UploaderTeamImg},
    {path: '/team/update', title:'更新队伍', component: teamUpdate},
    {path: '/user', title:'个人信息', component: User},
    {path: '/user/info', title:'用户详情', component: UserInfo},
    {path: '/search', title:'找伙伴', component: Search},
    {path: '/user/edit', title:'编辑信息', component: Edit},
    {path: '/user/register', title:'注册',component: UserRegister},
    {path: '/user/list', title:'用户列表', component: SearchResult},
    {path: '/user/login', title:"组队鸭", component: UserLogin},
    {path: '/user/fans', title:"我的粉丝", component: fans},
    {path: '/user/loves', title:"我的关注", component: loves},
    {path: '/user/shoppingMall', title:"积分商城", component: ShoppingMall},
    {path: '/user/thumbToMe', title:'赞',component:ThumbToMe},
    {path: '/user/updatePassword', title:"忘记密码", component: UpdatePassword},
    {path: '/user/update', title:'更新信息', component: UserUpdate},
    {path: '/user/bindPhone', title:'绑定手机', component: bindPhone},
    {path: '/user/updateTag', title:'更新标签', component: UpdateTag},
    {path: '/user/team/join', title:'我加入的队伍', component: UserTeamJoin},
    {path: '/user/team/create', title:'我创建的队伍',component: UserTeamCreate},
    {path: '/message', title:'消息中心', component: Message},
    {path: '/upload/awata', title:'上传头像', component: UploaderAwata},
    {path: '/post/info', title:'正文', component: PostInfo, meta:{BottomNavShow: false}},
    {path: '/post/add', title:'发布博客', component: postAdd,meta:{TiJiaoShow:true, SearchShow:false}},
    {path: '/post/edit', title:'编辑博客', component: postEdit,meta:{TiJiaoShow:true, SearchShow:false}},
    {path: '/my/post', title:'我的博客', component: myPost},
    {path: '/my/favours', title:'我的收藏', component: MyFavours},
    {path: '/message/publicChatroom', title:'公共聊天室', component: PublicChatRoom,meta:{BottomNavShow: false}},
    {path: '/message/teamChatroom', title:'队伍聊天室', component: TeamChatRoom,meta:{BottomNavShow: false}},
    {path: '/message/privateChatroom', title:'私人聊天室', component: PrivateChatRoom,meta:{BottomNavShow: false}},
    {path: '/order/create', title:'下单', component:CreateOrder},
    {path: '/order/my', title:'我的订单', component:MyOrders},
    {path: '/order/again', title:'下单', component:BuyAgain},
    {path: '/order/info', title:'订单详情', component:OrderInfo},





]

export default routes;