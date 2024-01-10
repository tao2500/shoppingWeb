<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-07
 * @description: 购物车页面
-->
<template>
    <Head></Head>
    <div class="myCart">
        <el-table
                ref="multipleTableRef"
                :data="tableData"
                style="width: 80%"
                @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="药品" show-overflow-tooltip>
                <template #default="scope">{{ scope.row.barCode}}</template>
            </el-table-column>
            <el-table-column property="price" label="单价" width="160"></el-table-column>
            <el-table-column property="count" label="数量" width="160"></el-table-column>
            <el-table-column property="sum" label="小计" width="160"></el-table-column>
            <el-table-column property="操作" label="操作" width="120">
                <template #default="scope">
                    <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="MCFoot">
            <span class="selected">
                已选{{multipleSelection.length}}件商品
            </span>
            <span>
                合计：￥{{multipleSelection.reduce((sum, item) => sum + item.sum, 0)}}
            </span>
            <el-button type="primary" size="mini">结算</el-button>
        </div>
    </div>
    <Foot></Foot>
</template>

<script setup>
    import Head from "./head.vue";
    import Foot from "./foot.vue";
    import {ref} from "vue";

    let tableData = ref([{
        id: 1,
        customerId: 1,
        barCode: '6924147603174',
        count: 1,
        status: 1,
        joinTime: '2024-01-10 00:00:00',
    }])

    let multipleSelection = ref([]); // 多选
    const handleSelectionChange = (val) => {
        multipleSelection.value = val
    }
</script>

<style lang="less" scoped>
  .myCart {
    height: calc(100vh - 100px);
    overflow: auto;
    .el-table {
      left: 10%;
    }
    .MCFoot {
      height: 60px;
      width: 80%;
      position: relative;
      left: 10%;
      display: flex;
      justify-content: flex-end;
      span {
        line-height: 60px;
        margin-right: 40px;
      }
      .selected {

      }
      .el-button {
        margin: 13px 46px 0 0;
      }
    }
  }
</style>
