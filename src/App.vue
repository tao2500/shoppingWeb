<script setup scoped>
    import Head from "./views/head.vue";
    import Foot from "./views/foot.vue";
</script>

<template>
    <Head></Head>
    <router-view></router-view>
    <Foot class="foot"></Foot>
</template>

<style scoped>
    .foot {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>
