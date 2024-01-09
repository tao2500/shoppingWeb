<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-07
-->
<template>
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

</template>

<script setup>
    import Medicine from "./medicine.vue";
    import typeAside from "./typeAside.vue";
    import {ref} from "vue";

    let medic = ref([{
        img: '../assets/img/homeHead/wang.jpg',
        name: '阿莫西林',
        price: 10,
        count: 99,
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
