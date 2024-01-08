<template>
    <div className="title">
        <div className="title-left">
            <div className="title-left-image"></div>
            <router-link to="/home">
                　　 <span className="">商城首页</span>
            </router-link>
            <router-link to="/teacher">
                　　<span className="">分类浏览</span>
            </router-link>
            <router-link to="/signUp">
                　　<span className="">我的购物车</span>
            </router-link>
            <router-link to="/activity">
                　　<span className="">我的订单</span>
            </router-link>
            <router-link to="/signIn">
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


