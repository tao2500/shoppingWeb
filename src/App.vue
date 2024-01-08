<script setup scoped>
    import Head from "./views/head.vue";
    import Foot from "./views/foot.vue";
</script>

<template>
    <Head></Head>
    <router-view></router-view>
    <foot class="foot"></foot>
</template>

<style scoped>
    .foot {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>
