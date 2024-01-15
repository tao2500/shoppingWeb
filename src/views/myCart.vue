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
                <template #default="scope">{{ scope.row.name}}</template>
            </el-table-column>
            <el-table-column property="price" label="单价" width="160"></el-table-column>
            <el-table-column property="count" label="数量" width="160"></el-table-column>
            <el-table-column property="summary" label="小计" width="160"></el-table-column>
            <el-table-column property="操作" label="操作" width="120">
                <template #default="scope">
                    <el-button  @click="deleteCart(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="MCFoot">
            <span class="selected">
                已选{{multipleSelection.length}}件商品
            </span>
            <span>
                合计：￥{{orderMsg.playMeny}}
            </span>
            <el-button type="primary" size="mini" @click="showSBClick">结算</el-button>
        </div>
    </div>
    <div>
        <PlayOrder :orderMsg="orderMsg" @playOk="playOk"></PlayOrder>
    </div>
    <Foot></Foot>
</template>

<script setup>
    import Head from "./head.vue";
    import Foot from "./foot.vue";
    import PlayOrder from "./playOrder.vue";
    import {onBeforeMount, ref} from "vue";
    import {deleteShoppingCart, getMyCart} from "../apis/shoppingCart/shoppingCart.js";
    import {ElLoading, ElMessage} from "element-plus";

    let tableData = ref([{
        id: 1,
        customerId: 1,
        barCode: '6924147603174',
        name: '娃哈哈AD钙奶250ml*15盒',
        price: 2.5,
        count: 1,
        status: 1,
        joinTime: '2024-01-10 00:00:00',
        summary: 2.5,
    }])

    let multipleSelection = ref([]);
    const handleSelectionChange = (val) => {
        multipleSelection.value = val
        getPlayMany()
    }

    const cId = ref(1);
    function getCart() {
        // 获取购物车列表
        getMyCart({
            customerId: cId.value
        }).then((res) => {
            if (res.code !== "200" || !res.items) {
                ElMessage.error(res.msg)
            } else {
                tableData.value = res.items
            }
        })
    }

    function getSummary () {
        setTimeout(() =>{
            tableData.value.forEach(item => {
                item.summary = Math.ceil(item.price * item.count *100) / 100
            })
        }, 1000)

    }

    onBeforeMount(() =>{
        cId.value = JSON.parse(localStorage.getItem("customer")).id
        getCart();
        getSummary()
    })

    function getPlayMany () {
        orderMsg.value.playMeny = multipleSelection.value.reduce((sum, item) => sum + item.summary, 0)
    }


    function deleteCart(item) {
        deleteShoppingCart(tableData.value[item]).then((res) => {
            if (res.code !== "200") {
                ElMessage.error(res.msg)
            } else {
                tableData.value.splice(item, 1);
                getSummary()
            }
        })
    }

    let orderMsg = ref({
        playMeny: 0,
        orderId: 0,
        show: false
    })

    function showSBClick () {
        if(orderMsg.value.playMeny <= 0) {
            ElMessage.error("请选择待结算药品")
            return
        }
        // 依据所选药品创建订单，状态为待支付
        // 购物车删除已结算商品
        orderMsg.value.show = true
    }

    function playOk (data) {
        orderMsg.value = data
    }

    let shoppingAdd = ref("");
</script>

<style lang="less" scoped>
  .myCart {
    height: calc(100vh - 100px);
    overflow: auto;
    .el-table {
      left: 10%;
      z-index: 0;
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
