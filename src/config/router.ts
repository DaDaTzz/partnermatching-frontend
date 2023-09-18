import Index from "../pages/index.vue";
import Team from "../pages/team.vue";
import User from "../pages/user.vue";
import Search from "../pages/search.vue";
import Edit from "../pages/edit.vue";
import SearchResult from "../pages/searchResult.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    { path: '/user', component: User },
    { path: '/search', component: Search },
    { path: '/user/edit', component: Edit },
    { path: '/user/list', component: SearchResult },

]

export default routes;