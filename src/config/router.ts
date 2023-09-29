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
import Friend from "../pages/Friend.vue";

const routes = [
    {path: '/', component: Index},
    {path: '/team',  title:'找队伍',  component: Team},
    {path: '/team/add', title:'创建队伍', component: teamAdd},
    {path: '/team/update', title:'更新队伍', component: teamUpdate},
    {path: '/user', title:'个人信息', component: User},
    {path: '/search', title:'找伙伴', component: Search},
    {path: '/user/edit', title:'编辑信息', component: Edit},
    {path: '/user/register', title:'注册',component: UserRegister},
    {path: '/user/list', title:'用户列表', component: SearchResult},
    {path: '/user/login', title:"伙伴匹配系统", component: UserLogin},
    {path: '/user/update', title:'更新信息', component: UserUpdate},
    {path: '/user/team/join', title:'我加入的队伍', component: UserTeamJoin},
    {path: '/user/team/create', title:'我创建的队伍',component: UserTeamCreate},
    {path: '/friend', title:'好友列表', component: Friend},



]

export default routes;