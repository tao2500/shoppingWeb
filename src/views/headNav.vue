<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-07
-->
<template>
    <div className="title">
        <div className="title-left">
            <div className="title-left-image"></div>
            <router-link to="/home">
                　　 <span className="">商城首页</span>
            </router-link>
            <router-link to="/typeBrowsing">
                　　<span className="">分类浏览</span>
            </router-link>
            <router-link to="/myCart">
                　　<span className="">我的购物车</span>
            </router-link>
            <router-link to="/myOrder">
                　　<span className="">我的订单</span>
            </router-link>
            <router-link to="/admin">
                　　<span className="">进入后台</span>
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Title',
    }
</script>
<style>
    span {
        font-size: 16px
    }

    a {
        display: inline-block;
        width: 130px;
        height: 40px;
        color: white;
        line-height: 40px;
        text-decoration: none;
        border-radius: 5px;
    }

    a:hover {
        background-color: white;
        color: black;
        transition: color 0.25s;
    }

</style>


