<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-11
 * @description: 售后管理
-->
<template>
    <div class="adminAfterSales">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed  prop="idOrderFrom" label="订单号"></el-table-column>
            <el-table-column prop="detail" label="内容"></el-table-column>
            <el-table-column prop="shoppingAdd" label="收货信息"></el-table-column>
            <el-table-column prop="status" label="状态" width="100"></el-table-column>
            <el-table-column prop="reasons" label="退款原因" width="180"></el-table-column>
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
    import {onBeforeMount, ref} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";
    import {getByStatu, sendO} from "../apis/admin/admin.js";

    let tableData = ref([{
        idOrderFrom: '123456789',
        customerId: '123456789',
        detail: "喜达、2，布洛芬、1",
        shoppingAdd: "刘先生,13138047388,广东省广州市天河区",
        delivery: '顺丰快递',
        waybillNumber: '123456789',
        total: '15.22',
        status: '待发货',
        joinTime: '2021-01-01 12:00:00',
        reasons: '无',
    }])

    function getOrders() {
        getByStatu({
            status: "退款中"
        }).then(res => {
            if (res.code !== "200") return ElMessage.error(res.msg)
            tableData.value = res.items
        })
    }

    onBeforeMount(() => {
        getOrders()
    })

    function deleteOk(index) {
        ElMessageBox.confirm('此操作将同意退款，确认无误？', '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: '取 消',
            type: 'warning'
        }).then(() => {
            tableData.value[index].status = "已退款"
            sendO(
                tableData.value[index]
            ).then(res => {
                if (res.code === "200") {
                    ElMessage({
                        type: 'success',
                        message: '退款成功!'
                    });
                } else {
                    ElMessage({
                        type: 'error',
                        message: '退款失败!请联系管理员'
                    });
                }
                getOrders();
            })
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
            tableData.value[index].status = "已完成"
            tableData.value[index].reasons = ""
            sendO(
                tableData.value[index]
            ).then(res => {
                if (res.code === "200") {
                    ElMessage({
                        type: 'success',
                        message: '已拒绝退款'
                    });
                } else {
                    ElMessage({
                        type: 'error',
                        message: '拒退失败!请联系管理员'
                    });
                }
                getOrders();
            })
        }).catch(() => {
            console.log('取消拒绝退款操作');
        });
    }
</script>

<style lang="less" scoped>
  .adminAfterSales {
    height: calc(100vh - 110px);
    overflow: auto;
    .el-table {
      max-height: calc(100vh - 110px);
      overflow: auto;
      z-index: 0;
    }
  }
</style>
