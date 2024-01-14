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
                        <p>收货地址：</p>{{t.shoppingAdd}}
                    </span>
                    <span class="statu">
                        <br/>
                        订单状态：{{t.status}}
                        <p @click="afterSalesClick">申请售后</p>
                    </span>
                    <span class="sumPri">
                        <br/>
                        订单总价：{{t.total}}
                        <P @click="showLogistics">查看物流</P>
                    </span>
                </div>
            </el-card>
        </div>
        <div>
            
        </div>
    </div>
    <Foot></Foot>
</template>

<script setup>
    import Head from "./head.vue";
    import Foot from "./foot.vue";
    import {ref} from "vue";

    let tableData = ref([{
        idOrderFrom: 1,
        customerId: 1,
        detail: "喜达、2，布洛芬、1，维生素B族咀嚼片、3",
        shoppingAdd: '广东省广州市花都区秀全街道学府路1号广州城市理工学院',
        total: 152.00,
        status: "已支付",
        joinTime: '2024-01-10 00:00:00',
    }])

    function  afterSalesClick() {
        console.log("申请售后")
    }

    function showLogistics() {
        console.log("查看物流")
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
      }
    }
  }
</style>
