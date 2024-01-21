<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-07
 * @description: 顾客订单管理
-->
<template>
    <Head></Head>
    <div class="myOrder">
        <div v-for="t of tableData">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>下单时间：{{t.joinTime}}</span>
                    <span style="float: right">订单号：{{t.idOrderFrom}}</span>
                </div>
                <div class="BCContainer">
                    <span class="container">
                        <p>订单信息：</p>
                        {{t.detail}}
                    </span>
                    <span class="addr">
                        <p>收货信息：</p>{{t.shoppingAdd}}
                    </span>
                    <span class="statu">
                        <br/>
                        订单状态：{{t.status}}
                        <div>
                            <div @click="cencellationOrder(t)" v-if="t.status === '待支付' || t.status === '待发货'" class="myBth">取消订单</div>
                            <div @click="goAfterSalesTab(t)" v-else-if="t.status !== '退款中' && t.status !== '已退款' && t.status !== '已取消'" class="myBth">申请售后</div>
                            <div @click="confirmReceipt(t)" v-if="t.status === '已发货'" class="myBth">确认收货</div>
                            <div @click="goPlay(t)" v-if="t.status === '待支付'" class="myBth">支付订单</div>
                        </div>
                    </span>
                    <span class="sumPri">
                        <br/>
                        订单总价：{{t.total}}
                        <div>
                            <div @click="showAfterSales(t)" v-if=" t.status === '退款中' || t.status === '已退款'" class="myBth">售后进度</div>
                            <div @click="showLogistics(t)" class="myBth">查看物流</div>
                            <div @click="deleteOrder(t)" v-if="t.status === '已完成' || t.status === '已退款' || t.status === '已取消'" class="myBth">删除订单</div>
                        </div>
                    </span>
                </div>
            </el-card>
        </div>
        <div class="showLogistic">
            <el-dialog :title = 'isLogistics ? "物流信息" :  "售后进度"' v-model="showLogisticsBox" width="30%">
                <el-timeline>
                    <el-timeline-item v-for="(delivery, index) in showLogisticsBoxData" :key="index" >
                        {{delivery}}
                    </el-timeline-item>
                </el-timeline>
            </el-dialog>
        </div>
        <div class="showAfterSales">
            <el-dialog title = "申请售后"  v-model="showAfterSalesTabBox" width="30%">
                <p>
                    非常抱歉给您带来不好的购药体验，请您填写退款原因，我们将在3个工作日内完成售后处理
                </p>
                <el-form :model="afterSalesForm" label-width="80px">
                    <el-form-item label="退款原因">
                        <el-input v-model="afterSalesForm.reason" type="textarea" placeholder="请输入退款原因"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="showAfterSalesTabBox = false">取 消</el-button>
                        <el-button type="primary" @click="addAfterSales">提 交</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <div>
            <PlayOrder :orderMsg="orderMsg" @playOk="playOk" @playNO="playNo"></PlayOrder>
        </div>
    </div>
    <Foot></Foot>
</template>

<script setup>
    import Head from "./head.vue";
    import Foot from "./foot.vue";
    import PlayOrder from "./playOrder.vue";
    import {onBeforeMount, ref} from "vue";
    import {
        deleteOrderFrom,
        getMyOrderFromList,
        playOKK,
        upDataOrderFrom,
        upDataOrderFromStatus
    } from "../apis/orderFrom/orderFrom.js";
    import {ElMessage, ElMessageBox} from "element-plus";

    let tableData = ref([{
        idOrderFrom: 1,
        customerId: 1,
        detail: "喜达*2；布洛芬*1；维生素B族咀嚼片*3",
        shoppingAdd: '广东省广州市花都区秀全街道学府路1号广州城市理工学院',
        delivery: "同城闪送",
        waybillNumber: "SF1234567890",
        total: 152.00,
        status: "已支付",
        joinTime: '2024-01-10 00:00:00',
    }])

    const customerId = ref(1);
    function getMyOrder() {
        getMyOrderFromList({
            customerId: customerId.value
        }).then((res) => {
            if (res.code === "200") {
                tableData.value = res.items;
                // 订单按时间顺序排列
                tableData.value.sort((a, b) => {
                    return new Date(b.joinTime).getTime() - new Date(a.joinTime).getTime()
                })
            } else {
                console.log(res.msg);
            }
        })
    }

    onBeforeMount(() => {
        customerId.value = JSON.parse(localStorage.getItem("customer")).id;
        getMyOrder();
    })

    function  afterSalesClick() {
        console.log("申请售后")
    }

    function addLogisticsMsg (t) {
        showLogisticsBoxData.value.push("商品已下单,等待买家支付 | " + t.joinTime)
        if (t.status === "待支付") return;
        if (t.status === "已取消") {
            showLogisticsBoxData.value.unshift("订单已取消");
            return;
        }
        showLogisticsBoxData.value.unshift("买家已支付")
        showLogisticsBoxData.value.unshift("商家正在分拣订单，准备发货")
        if (t.status === "待发货") return;
        showLogisticsBoxData.value.unshift("已发货: " + t.delivery+ "，运单号：" + t.waybillNumber)
        if (t.status === "已发货") return;
        showLogisticsBoxData.value.unshift("已签收，感谢使用康无忧购药")
        if (t.status === "已完成") return;
    }

    // 点击的是否是查看物流
    let isLogistics = ref(false);
    let showLogisticsBox = ref(false);
    let showLogisticsBoxData = ref([]);
    // 查看物流
    function showLogistics(t) {
        isLogistics.value = true;
        showLogisticsBoxData.value = [];
        // 添加物流信息
        addLogisticsMsg(t);
        showLogisticsBox.value = true;
    }

    function addAfterSalesMsg (t) {
        showLogisticsBoxData.value.push(" 已提交售后申请,等待商家处理")
        if (t.status === "退款中") return;
        if (t.status === "已退款") {
            showLogisticsBoxData.value.unshift("商家已同意售后申请，资金将在3个工作日内退回支付账户，期待您的再次使用")
        }
    }
    // 售后进度
    function showAfterSales(t){
        isLogistics.value = false;
        showLogisticsBoxData.value = [];
        // 添加售后信息
        addAfterSalesMsg(t)
        showLogisticsBox.value = true;
    }

    // 取消订单
    function cencellationOrder (t) {
        ElMessageBox.confirm(t.status === "待发货" ? '资金将在三个工作日内退回原支付账户, 确定取消订单吗?' : '确定取消订单吗?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning',
        })
        .then(() => {
            upDataOrderFromStatus({
                idOrderFrom: t.idOrderFrom,
                status: "已取消",
                drugList: t.detail,
            }).then((res) => {
                if (res.code !== "200") {
                    ElMessage.error("取消失败，请联系工作人员");
                } else {
                    ElMessage({
                        type: 'success',
                        message: '已取消订单',
                    })
                    getMyOrder();
                }
            })
        })
        .catch(() => {
          console.log("取消 取消订单操作")
        })
    }

    let  showAfterSalesTabBox = ref(false);
    let afterSalesForm = ref({
        reason: ""
    })
    let order = ref({});
    // 申请售后
    function goAfterSalesTab (t) {
        showAfterSalesTabBox.value = true;
        order.value = t;
    }
    // 提交申请
    function addAfterSales() {
        if (afterSalesForm.value.reason === '') {
            ElMessage.error("请填写售后原因");
            return;
        }
        order.value.status = "退款中";
        order.value.reasons = afterSalesForm.value.reason;
        upDataOrderFrom(order.value).then((res) => {
            if (res.code === "200") {
                ElMessage.success("已提交申请")
                showAfterSalesTabBox.value = false;
                afterSalesForm.value.reason = '';
                getMyOrder();
            } else {
                ElMessage.error("售后申请失败，请联系工作人员");
            }
        })
    }

    // 确认收货
    function confirmReceipt(t) {
        t.status = "已完成";
        upDataOrderFrom(t).then((res) => {
            if (res.code === "200") {
                ElMessage.success("收货成功")
                getMyOrder();
            } else {
                t.status = "待收货";
                ElMessage.error("收货失败，请联系工作人员");
            }
        })
    }

    // 删除订单
    function deleteOrder(t) {
        ElMessageBox.confirm('订单将永久删除，是否继续？', '提示', {
            confirmButtonText: '删 除',
            cancelButtonText: '取 消',
            type: 'warning',
        }).then(() => {
            deleteOrderFrom(t).then((res) => {
                if (res.code !== "200") {
                    ElMessage.error("取消失败，请联系工作人员");
                } else {
                    ElMessage({
                        type: 'success',
                        message: '已删除订单',
                    })
                    getMyOrder();
                }
            })
        }).catch(() => {
            console.log("取消 取消订单操作")
        })
    }

    let orderMsg = ref({
        playMeny: 0,
        orderId: 0,
        show: false
    })
    // 支付订单
    function goPlay(t) {
        orderMsg.value.playMeny = t.total;
        orderMsg.value.orderId = t.idOrderFrom;
        orderMsg.value.show = true;
    }
    function playOk (data) {
        orderMsg.value = data
        getMyOrder()
    }
    function playNo () {
        orderMsg.value.show = false
        getMyOrder()
    }
</script>

<style lang="less" scoped>
  .myOrder {
    height: calc(100vh - 100px);
    overflow: auto;
    width: 80%;
    position: relative;
    left: 10%;
    .box-card {
      margin-top: 5px;
      .clearfix {
        padding: 10px;
        background-color: #f5f7fa;
      }
      .BCContainer {
        margin-top: 5px;
        height: 120px;
        span {
          display: inline-block;
          width: 20%;
          height: 120px;
          margin-right: 10px;
          vertical-align: top;
          overflow: auto;
          text-align: center;
        }
        .container {
          width: 40%;
            //background-color: #999999;
        }
        .addr {
          width: 26%;
          //background-color: black;
        }
        .statu {
          width: 15%;
          //background-color: #999999;
        }
        .sumPri {
          width: 15%;
          //background-color: black;
        }
        .myBth {
          margin-top: 5px;
          color: #2365F3;
          cursor: pointer;
        }
      }
    }
  }
</style>
