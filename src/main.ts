import { createApp } from 'vue'
import App from './App.vue'
import { Button, NavBar, Tabbar, TabbarItem, Search, Tag, Divider, Col, Row,Cell, CellGroup,Card,Empty } from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./config/router.ts";

const app = createApp(App)
app.use(Button)
app.use(NavBar)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Tag)
app.use(Divider)
app.use(Col)
app.use(Row)
app.use(Cell)
app.use(CellGroup)
app.use(Card)
app.use(Empty)



const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router)
app.mount('#app')

