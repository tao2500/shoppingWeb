<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-11
 * @description: 店员订单管理
-->
<template>
    <div class="adminOrder">
        <div>
            订单状态：
            <el-select v-model="searchStatus" placeholder="待发货" @change="selectByStatus">
                <el-option label="待支付" value="待支付"></el-option>
                <el-option label="待发货" value="待发货"></el-option>
                <el-option label="已发货" value="已发货"></el-option>
                <el-option label="已取消" value="已取消"></el-option>
                <el-option label="已完成" value="已完成"></el-option>
                <el-option label="退款中" value="退款中"></el-option>
                <el-option label="已退款" value="已退款"></el-option>
                <el-option label="所有状态" value="所有状态"></el-option>
            </el-select>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed  prop="idOrderFrom" label="订单号"></el-table-column>
            <el-table-column prop="detail" label="内容"></el-table-column>
            <el-table-column prop="shoppingAdd" label="收货信息"></el-table-column>
            <el-table-column prop="delivery" label="配送方式" width="100"></el-table-column>
            <el-table-column prop="status" label="状态" width="100"></el-table-column>
            <el-table-column prop="joinTime" label="下单时间" width="170"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                    <el-button
                            link
                            type="primary"
                            size="small"
                            v-if="scope.row.status !== '已取消'"
                            @click="cancellation(scope.$index)"
                    >
                        取消订单
                    </el-button>
                    <el-button
                            link
                            type="primary"
                            size="small"
                            v-if="scope.row.status === '已取消'"
                            @click="deleteOrder(scope.$index)"
                    >
                        删除订单
                    </el-button>
                    <el-button
                            link
                            type="primary"
                            size="small"
                            v-if="scope.row.status === '待发货'"
                            @click="send(scope.$index)"
                    >
                        发货
                    </el-button>
                    <el-button
                            link
                            type="primary"
                            size="small"
                            v-if="scope.row.status === '已发货'"
                            @click="send(scope.$index)"
                    >
                        修改运单
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
    import {onBeforeMount, ref} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";
    import {delO, getAllOrders, getByStatu, sendO} from "../apis/admin/admin.js";

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
    let searchStatus = ref('待发货')

    function getByStatus () {
        getByStatu({
            status: searchStatus.value
        }).then(res => {
            if (res.code !== "200") return ElMessage.error(res.msg)
            tableData.value = res.items
        })
    }
    onBeforeMount(() => {
        getByStatus();
    })

    function send(index) {
        ElMessageBox.prompt('请录入运单号', '运单录入', {
            confirmButtonText: '发 货',
            cancelButtonText: '取 消',
            inputPattern:
                /^\S{2}\d+$/,
            inputErrorMessage: '请输入运单号',
        }).then(({ value }) => {
            tableData.value[index].waybillNumber = value
            tableData.value[index].status = "已发货"
            sendO(
                tableData.value[index]
            ).then(res => {
                if (res.code === "200"){
                    ElMessage({
                        type: 'success',
                        message: `发货成功`,
                    })
                } else {
                    ElMessage.error(res.msg)
                }
                getByStatus();
            })
        }).catch(() => {
            console.log('取消发货');
        })
    }

    function deleteOrder(index) {
        ElMessageBox.confirm('该订单将彻底删除，是否继续？' , '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: '取 消',
            type: 'warning'
        }).then(() => {
            delO(
                tableData.value[index]
            ).then(res => {
                if (res.code === "200"){
                    ElMessage({
                        type: 'success',
                        message: `删除成功`,
                    })
                } else {
                    ElMessage.error(res.msg)
                }
                getByStatus();
            })
        }).catch(() => {
            console.log('取消删除');
        })
    }

    function cancellation(index) {
        ElMessageBox.confirm('请先电话告知顾客退单原因，资金将在1-3个工作日内原路退回顾客账户' , '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: '取 消',
            type: 'warning'
        }).then(() => {
            tableData.value[index].status = "已取消"
            sendO(
                tableData.value[index]
            ).then(res => {
                if (res.code === "200"){
                    ElMessage({
                        type: 'success',
                        message: `退单成功`,
                    })
                } else {
                    ElMessage.error(res.msg)
                }
                getByStatus();
            })
        }).catch(() => {
            console.log('取消退单');
        })
    }

    function selectByStatus() {
        if (searchStatus.value === "所有状态"){
            return getAllOrders().then(res => {
                if (res.code !== "200") return ElMessage.error(res.msg)
                tableData.value = res.items
            })
        } else {
            getByStatus();
        }
    }
</script>

<style lang="less" scoped>
  .adminOrder {
    height: calc(100vh - 110px);
    overflow: auto;
    .el-table {
      max-height: calc(100vh - 110px);
      overflow: auto;
      z-index: 0;
    }
  }
</style>
