// index.js
import {createRouter, createWebHashHistory} from 'vue-router';

// 路由规则
const routes = [
    {
        path: '/',
        name: 'home',
        meta: {title: '商城首页'},
        component: () => import('../views/home.vue'),
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
    // {
    //     path: '/my',
    //     name: 'my',
    //     meta: {title: '账户中心'},
    //     component: () => import('../components/myPage.vue'),
    //     children: [{
    //         path: 'itemAddress',
    //         meta: {title: '接口地址GitHub'},
    //         // name: 'itemAddress',
    //         component: '<div><p>test</p></div>'
    //     },{
    //         path: 'APIGitee',
    //         meta: {title: '接口地址Gitee'},
    //         component: '<div><p>test</p></div>'
    //     },{
    //         path: 'ScenarioExample',
    //         meta: {title: '场景示例'},
    //         component: '<div><p>示例场景页</p></div>'
    //     },{
    //         path: 'exampleCode',
    //         meta: {title: '示例代码'},
    //         component: '<div><p>示例代码页</p></div>'
    //     },{
    //         path: 'FineTune',
    //         meta: {title: 'Fine-tune微调'},
    //         component: '<div><p>Fine-tune微调页</p></div>'
    //     },{
    //         path: 'Assistant',
    //         meta: {title: 'Assistant助手'},
    //         component: '<div><p>Assistant助手</p></div>'
    //     },{
    //         path: 'itemApps',
    //         meta: {title: 'AI应用示例'},
    //         component: '<div><p>AI应用示例</p></div>'
    //     },{
    //         path: 'docs',
    //         meta: {title: '智增增官方文档'},
    //         component: '<div><p>智增增官方文档</p></div>'
    //     },{
    //         path: 'Help',
    //         // name: 'Help',
    //         meta: {title: '帮助中心'},
    //         component: () => import('../components/help-center.vue')
    //     },{
    //         path: '',
    //         meta: {title: '账户中心'},
    //         component: () => import('../components/defaultPag.vue'),
    //     },{
    //         path: 'price',
    //         meta: {title: '产品价格'},
    //         component: () => import('../components/myPrice.vue'),
    //     },{
    //         path: 'about',
    //         meta: {title: '联系我们'},
    //         component: () => import('../components/contactUs.vue'),
    //     },{
    //         path: 'ChargeRecord',
    //         // name: 'ChargeRecord',
    //         meta: {title: '充值记录'},
    //         component: () => import('../components/MyChargeRecord.vue'),
    //     },{
    //         path: 'FinetuneRecord',
    //         // name: 'FinetuneRecord',
    //         meta: {title: '我的微调模型'},
    //         component: () => import('../components/MyFinetuneRecord.vue'),
    //     },{
    //         path: 'UsageRecord',
    //         // name: 'UsageRecord',
    //         meta: {title: '调用记录（最多保留最近一个月的记录，仅用于查找问题）'},
    //         component: () => import('../components/MyUsageRecord.vue'),
    //     }]
    // }
];

const router = createRouter({
    // vueRouter@3版本的mode改成了history，hash模式配置createWebHashHistory，history模式配置createWebHistory
    history: createWebHashHistory(),
    routes
});

export default router;
