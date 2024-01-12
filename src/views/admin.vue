<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-07
-->
<template>
    <Head></Head>
    <div class="admin">
        <el-container class="ADHome">
            <el-aside width="260px" >
                <admin-aside></admin-aside>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
    <Foot></Foot>
</template>

<script setup>
    import Head from "./head.vue";
    import Foot from "./foot.vue";
    import adminAside from "./adminAside.vue";
    import AdminAside from "./adminAside.vue";

</script>

<style lang="less" scoped>
  .admin {
    height: calc(100vh - 100px);
    overflow: auto;
    .ADHome {
        .el-main {
          padding: 10px 20px 0 20px;
        }
    }
  }
</style>
