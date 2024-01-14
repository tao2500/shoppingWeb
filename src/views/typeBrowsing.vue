<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-07
 * @description: 分类浏览页
-->
<template>
    <Head></Head>
    <el-container class="TB">
        <el-main>
            <div class="showMedicine" v-for="m of medic">
                <medicine class="med" :medic="m"></medicine>
            </div>
        </el-main>
        <el-aside width="260px" >
            <typeAside @getDrugsByType="getDrugsByType"></typeAside>
        </el-aside>
    </el-container>
    <Foot></Foot>
</template>

<script setup>
    import Head from "./head.vue";
    import Foot from "./foot.vue";
    import Medicine from "./medicine.vue";
    import typeAside from "./typeAside.vue";
    import {ref} from "vue";

    let medic = ref([{
        barCode: '1234567890123456789',
        imgSrc: '../assets/img/homeHead/wang.jpg',
        name: '阿莫西林',
        type: '西药',
        effect: '用于感冒引起的头痛、发热、鼻塞、流涕、咳嗽等',
        count: 99,
        size: '100mg*10片',
        price: 10,
        expires: '2024-01-01'
    }]);

    function getDrugsByType(data) {
        medic.value = data;
    }
</script>

<style lang="less" scoped>
  .TB {
    height: calc(100vh - 100px);
    overflow: auto;
    .showMedicine {
      .med {
        display: inline-block;
        float: left;
        margin: 10px 5px;
      }
    }
  }
</style>
