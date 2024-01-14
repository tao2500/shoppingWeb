<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-09
 * @description: 分类浏览页导航栏
-->
<template>
    <div class="TA">
        <div class="TBBox">
            <el-button class="typeBut" v-for="t of allType" type="primary" size="small" @click="getDrugsByType(t)" >{{t}}</el-button>
        </div>
        <div>
            <ArrowDownBold class="showAll" @click="showDrawer = true"></ArrowDownBold>
        </div>
        <el-drawer
                v-model="showDrawer"
                title="全部类型如下"
                direction="rtl"
                size="15%"
        >
            <el-button class="EDTypeBut" v-for="t of allType" type="primary" size="small" @click="getDrugsByType(t)" >{{t}}</el-button>
        </el-drawer>
    </div>

</template>

<script setup>
    import {getAllType, getByType} from "../apis/typeAside/typeAside.js";
    import { ArrowDownBold } from "@element-plus/icons-vue";
    import {onBeforeMount, ref} from "vue";

    let allType = ref([]);
    onBeforeMount(async () => {
        getAllType().then(res => {
            if (res.code === "200"){
                allType.value = res.items;
                getDrugsByType(allType.value[0]);
            } else {
                this.$message.error(res.msg);
            }
        })
    })

    const emit = defineEmits(['get-drugs-by-type'])
    function getDrugsByType(type) {
        getByType({type: type}).then(res => {
            if (res.code === "200"){
                emit('getDrugsByType', res.items);
            } else {
                this.$message.error(res.msg);
            }
        })
    }

    let showDrawer = ref(false);

</script>

<style lang="less" scoped>
  .TA {
    height: calc(70vh - 100px);
    margin-top: 30%;
    .TBBox {
      width: 50%;
      height: calc(70vh - 120px);
      border: #999999 solid 2px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      left: 72px;
      margin-top: -13px;
      .typeBut {
        display: block;
        width: 100%;
        height: 30px;
        margin: 0 0 5px 0;
        background-color: #999999;
      }
      .typeBut:hover {
        background-color: #cccccc;
      }
    }
    .showAll {
      width: 20px;
      height: 20px;
      // 居中
      position: relative;
      left: 50%;
    }
    .EDTypeBut {
        display: block;
        width: 100%;
        height: 30px;
        margin: 0 0 5px 0;
        background-color: #999999;
    }
  }
</style>
