import Index from "../pages/index.vue";
import Team from "../pages/team.vue";
import User from "../pages/user.vue";
import Search from "../pages/search.vue";
import Edit from "../pages/edit.vue";
import SearchResult from "../pages/searchResult.vue";
import UserLogin from "../pages/userLogin.vue";
import teamAdd from "../pages/teamAdd.vue";
import teamUpdate from "../pages/teamUpdate.vue";
import UserUpdate from "../pages/userUpdate.vue";
import UserTeamJoin from "../pages/userTeamJoin.vue";
import UserTeamCreate from "../pages/userTeamCreate.vue";
import UserRegister from "../pages/userRegister.vue";
import UpdateTag from "../pages/updateTag.vue";
import UserInfo from "../pages/userInfo.vue";
import TeamInfo from "../pages/teamInfo.vue";
import PortInfo from "../pages/portInfo.vue";
import myPorts from "../pages/myPorts.vue";
import portAdd from "../pages/portAdd.vue";
import Message from "../pages/Message.vue";
import fans from "../pages/fans.vue";
import loves from "../pages/loves.vue";
import bindEmail from "../pages/bindEmail.vue";
import UploaderAwata from "../pages/UploaderAwata.vue";
import UploaderTeamImg from "../pages/UploaderTeamImg.vue";
import UpdatePassword from "../pages/updatePassword.vue";
import MyFavours from "../pages/myFavours.vue";


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
    {path: '/user/updatePassword', title:"忘记密码", component: UpdatePassword},
    {path: '/user/update', title:'更新信息', component: UserUpdate},
    {path: '/user/bindEmail', title:'绑定邮箱', component: bindEmail},
    {path: '/user/updateTag', title:'更新标签', component: UpdateTag},
    {path: '/user/team/join', title:'我加入的队伍', component: UserTeamJoin},
    {path: '/user/team/create', title:'我创建的队伍',component: UserTeamCreate},
    {path: '/message', title:'消息中心', component: Message},
    {path: '/upload/awata', title:'上传头像', component: UploaderAwata},
    {path: '/post/info', title:'正文', component: PortInfo, meta:{BottomNavShow: false}},
    {path: '/my/post', title:'我的博文', component: myPorts},
    {path: '/my/favours', title:'我的收藏', component: MyFavours},
    {path: '/post/add', title:'添加博文', component: portAdd,meta:{TiJiaoShow:true, SearchShow:false}},




]

export default routes;