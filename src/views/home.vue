<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-07
-->
<template>
    <div class="home">
        <div class="search">
            <span class="txt-search">
                <input placeholder="请输入药品关键字" v-model="searchTxt" @keyup.enter="searchClick"/>
            </span>
            <span class="searchBUT">
                <el-button type="primary" size="small" @click="searchClick">搜索</el-button>
                <el-button type="primary" size="small" @click="getAllDrug">浏览所有药品</el-button>
            </span>
        </div>
        <div class="showMedicine" v-for="m of medic">
            <medicine class="med" :medic="m"></medicine>
        </div>
    </div>
</template>

<script setup>
    import {onBeforeMount, ref} from "vue";
    import Medicine from "./medicine.vue";
    import {getAllDrugs, getDrugByName} from "../apis/home/index.js";
    import {ElMessage} from "element-plus";

    let searchTxt = ref('');
    function searchClick() {
        if (searchTxt.value === ''){
            ElMessage.error('请输入药品关键字');
            return;
        }
        getDrugByName({name: searchTxt.value}).then(res => {
            if (res.code === "200"){
                medic.value = res.items;
            } else {
                ElMessage.error(res.msg);
                searchTxt.value = '';
            }
        })
    }

    onBeforeMount(async () => {
        getAllDrug();
    })

    function getAllDrug() {
        getAllDrugs().then(res => {
            if (res.code === "200"){
                medic.value = res.items;
            } else {
                this.$message.error(res.msg);
            }
        })
    }

    let medic = ref([{
        img: '../assets/img/homeHead/wang.jpg',
        name: '阿莫西林',
        price: 10,
        count: 99,
    }]);
</script>

<style lang="less" scoped>
    .home {
      height: calc(100vh - 100px);
      overflow: auto;
      .search {
        text-align: right;
        margin: 10px 20px;

        .txt-search {
          margin-left: 20px;
          input {
            width: 260px;
            height: 30px;
            border-radius: 5px;
            border: 1px solid #ccc;
            padding: 0 10px;
          }
        }
        .searchBUT {
          margin-left: 20px;
          :deep(.el-button--small) {
            height: 30px;
          }
        }
      }
      .showMedicine {
        .med {
          display: inline-block;
          float: left;
          margin: 10px 5px;
        }
      }
    }
</style>
