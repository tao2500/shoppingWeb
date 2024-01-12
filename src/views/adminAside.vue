<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-10
-->
<template>
    <div class="adminAside">
        <el-menu
                :default-active="activePath"
                class="el-menu-V"
                text-color="#333333"
                active-text-color="#2365F3"
                router
                unique-opened>
            <el-sub-menu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                <template v-slot:title>
                    <el-icon><User /></el-icon>
                    <span>{{ item.authName }}</span>
                </template>
                <template v-for="subItem in item.children" :key="subItem.id">
                    <el-menu-item v-if="!subItem.children" :index="'/admin/' + subItem.path">
<!--                        <el-icon>{{subItem.imgSrc}}</el-icon>-->
                        <span class="menuItemText">{{ subItem.authName }}</span>
                    </el-menu-item>
                </template>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup>
    import {onBeforeMount, ref} from "vue";
    import {User, Plus} from "@element-plus/icons-vue";
    import router from "../router/index.js";
     // 根据路由判断当前激活的菜单
    let activePath = ref('/admin/' + router.currentRoute.value.name);

    const menulist = ref([{
        id: 1,
        authName: '管理后台',
        imgSrc: 'User',
        children: [{
            id: 2,
            path: 'adminMedicine',
            authName: '药品管理',
            imgSrc: 'User',
        },{
            id: 4,
            path: 'adminOrder',
            authName: '订单管理',
        },{
            id: 5,
            path: 'adminAfterSales',
            authName: '售后管理',
        }]
    }]);

    let customer = JSON.parse(localStorage.getItem('customer'));
    onBeforeMount(() => {
        if (customer && customer.duties === "超级管理员") {
            menulist.value[0].children.push({
                id: 3,
                path: 'adminDelivery',
                authName: '配送管理',
            },{
                id: 6,
                path: 'adminStaff',
                authName: '员工管理',
            },{
                id: 7,
                path: 'adminCustomer',
                authName: '顾客管理',
            })
        }

    })
</script>

<style lang="less" scoped>
  .adminAside {
    height: calc(100vh - 110px);
    overflow: auto;
  }
</style>
