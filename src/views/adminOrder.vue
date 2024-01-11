<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-11
 * @description: 店员订单管理
-->
<template>
    <div class="adminOrder">
        <div>
            订单状态：
            <el-select v-model="searchStatus" placeholder="待发货">
                <el-option label="待发货" value="待发货"></el-option>
                <el-option label="已发货" value="已发货"></el-option>
                <el-option label="已完成" value="已完成"></el-option>
                <el-option label="已取消" value="已取消"></el-option>
                <el-option label="所有状态" value=""></el-option>
            </el-select>
        </div>
        <el-table :data="tableData" style="width: 100%" max-height="250">
            <el-table-column fixed  prop="idOrderFrom" label="订单号"></el-table-column>
            <el-table-column prop="detail" label="内容"></el-table-column>
            <el-table-column prop="shoppingAdd" label="收货信息"></el-table-column>
            <el-table-column prop="status" label="状态" width="100"></el-table-column>
            <el-table-column prop="joinTime" label="下单时间" width="170"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template #default="scope">
                    <el-button
                            link
                            type="primary"
                            size="small"
                            @click="send(scope.$index)"
                    >
                        发货
                    </el-button>
                    <el-button
                            link
                            type="primary"
                            size="small"
                            @click="deleteOrder(scope.$index)"
                    >
                        取消订单
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
    import {ref} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";

    let tableData = ref([{
        idOrderFrom: '123456789',
        customerId: '123456789',
        detail: "喜达、2，布洛芬、1",
        shoppingAdd: "刘先生,13138047388,广东省广州市天河区",
        total: '15.22',
        status: '待发货',
        joinTime: '2021-01-01 12:00:00',
    }])
    let searchStatus = ref('待发货')

    function send(index) {
        ElMessageBox.prompt('请录入运单号', 'Tip', {
            confirmButtonText: '发 货',
            cancelButtonText: '取 消',
            inputPattern:
                /\d/,
            inputErrorMessage: '请输入运单号',
        }).then(({ value }) => {
            ElMessage({
                type: 'success',
                message: `发货成功`,
            })
        }).catch(() => {
            console.log('取消发货');
        })
    }

    function deleteOrder(index) {
        ElMessageBox.confirm('请先电话告知顾客退单原因' , '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: '取 消',
            type: 'warning'
        }).then(() => {
            ElMessage({
                type: 'success',
                message: `退单成功`,
            })
        }).catch(() => {
            console.log('取消退单');
        })
    }
</script>

<style lang="less" scoped>
  .adminOrder {
    height: calc(100vh - 100px);
    overflow: auto;
  }
</style>
