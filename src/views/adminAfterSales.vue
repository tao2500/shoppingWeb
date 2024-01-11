<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-11
 * @description: 售后管理
-->
<template>
    <div class="adminAfterSales">
        <el-table :data="tableData" style="width: 100%" max-height="250">
            <el-table-column fixed  prop="idOrderFrom" label="订单号"></el-table-column>
            <el-table-column prop="detail" label="内容"></el-table-column>
            <el-table-column prop="shoppingAdd" label="收货信息"></el-table-column>
            <el-table-column prop="status" label="状态" width="100"></el-table-column>
            <el-table-column prop="joinTime" label="下单时间" width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button
                            link
                            type="primary"
                            size="small"
                            @click="deleteOk(scope.$index)"
                    >
                        同意退款
                    </el-button>
                    <el-button
                            link
                            type="primary"
                            size="small"
                            @click="deleteNo(scope.$index)"
                    >
                        谢绝退款
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
        status: '退款中',
        joinTime: '2021-01-01 12:00:00',
    }])

    function deleteOk(index) {
        ElMessageBox.confirm('此操作将同意退款，确认无误？', '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: '取 消',
            type: 'warning'
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '退款成功!'
            });
            tableData.value.splice(index, 1);
        }).catch(() => {
            console.log('取消退款操作');
        });
    }

    function deleteNo(index) {
        ElMessageBox.confirm('请预先告知客户拒绝退款原因', '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: '取 消',
            type: 'warning'
        }).then(() => {
            ElMessage({
                type: 'success',
                message: '已谢绝退款!'
            });
            tableData.value.splice(index, 1);
        }).catch(() => {
            console.log('取消拒绝退款操作');
        });
    }
</script>

<style lang="less" scoped>
  .adminAfterSales {
    height: calc(100vh - 100px);
    overflow: auto;
  }
</style>
