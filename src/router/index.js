// index.js
import {createRouter, createWebHashHistory} from 'vue-router';

// 路由规则
const routes = [
    {
        path: '/',
        redirect: 'home'
    },
    {
        path: '/my',
        redirect: 'home'
    },
    {
        path: '/login',
        name: 'login',
        meta: {title: '登录'},
        component: () => import('../views/login.vue'),
    },
    {
        path: '/home',
        name: 'home',
        meta: {title: '商城首页'},
        component: () => import('../views/home.vue'),
    },
    {
        path: '/typeBrowsing',
        name: 'typeBrowsing',
        meta: {title: '分类浏览'},
        component: () => import('../views/typeBrowsing.vue'),
    },
    {
        path: '/myCart',
        name: 'myCart',
        meta: {title: '我的购物车'},
        component: () => import('../views/myCart.vue'),
    },
    {
        path: '/myOrder',
        name: 'myOrder',
        meta: {title: '我的订单'},
        component: () => import('../views/myOrder.vue'),
    },
    {
        path: '/admin',
        name: 'admin',
        meta: {title: '管理后台'},
        component: () => import('../views/admin.vue'),
    }
];

const router = createRouter({
    // vueRouter@3版本的mode改成了history，hash模式配置createWebHashHistory，history模式配置createWebHistory
    history: createWebHashHistory(),
    routes
});

export default router;
