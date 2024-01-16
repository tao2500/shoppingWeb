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
    <div class="setAddress">
        <el-dialog v-model="showAddress" class="dial" title="确认地址" width="30%">
            <el-form :model="shoppingAdd" label-width="120px">
                <el-form-item label="收货人">
                    <el-input v-model="shoppingAdd.name" placeholder="请输入收货人姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="shoppingAdd.telephone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="收货地址">
                    <el-input v-model="shoppingAdd.address" placeholder="请输入收货地址"></el-input>
                </el-form-item>
            </el-form>
            <span class="selectDelivery">
                配送方式
                <el-radio-group v-model="shoppingAdd.delivery" size="large">
                    <el-radio-button label="快递发货">快递发货</el-radio-button>
                    <el-radio-button label="同城闪送">同城闪送</el-radio-button>
                </el-radio-group>
            </span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddress = false">取 消</el-button>
                <el-button type="primary" @click="goPlay">支 付</el-button>
            </div>
        </el-dialog>
    </div>
    <div>
        <PlayOrder :orderMsg="orderMsg" @playOk="playOk" @playNO="playNo"></PlayOrder>
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
    import {addOrderFroms} from "../apis/orderFrom/orderFrom.js";
    import {sendO} from "../apis/admin/admin.js";

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
                getSummary()
            }
        })
    }

    function getSummary () {
        tableData.value.forEach(item => {
            item.summary = Math.ceil(item.price * item.count *100) / 100
        })
    }

    onBeforeMount(() =>{
        let customer = JSON.parse(localStorage.getItem("customer"));
        cId.value = customer.id;
        shoppingAdd.value.name = customer.name;
        shoppingAdd.value.telephone = customer.telephone;
        shoppingAdd.value.address = customer.address;
        getCart();
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
        //  跳转确认收货地址页
        showAddress.value = true
    }

    let showAddress = ref(false);
    let shoppingAdd = ref({
        name: "",
        telephone: "",
        address: "",
        delivery: "快递发货"
    });
    function goPlay() {
        // 传输收获地址及方式
        multipleSelection.value[0].address = shoppingAdd.value.name + ',' + shoppingAdd.value.telephone + ',' + shoppingAdd.value.address + ',' + shoppingAdd.value.delivery;
        // 依据所选药品创建订单，状态为待支付，返回数据库生成的订单号，用于支付页修改订单状态
        addOrderFroms(
            multipleSelection.value
        ).then(res => {
            if(res.code !== "200") {
                ElMessage.error(res.msg)
            } else {
                ElMessage.success(res.msg);
                orderMsg.value.orderId = res.items[0].idOrderFrom
            }
        })
        // 跳转支付页
        orderMsg.value.show = true
        showAddress.value = false
    }

    function playOk (data) {
        orderMsg.value = data
        // 后台清除购物车已结算药品, 更新购物车
        getCart();
        // 订单状态设置为已支付
    }
    function playNo () {
        orderMsg.value.show = false
        ElMessage.success("已取消支付")
        // 后台清除购物车已结算药品
        // 更新购物车
        getCart();
    }

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
  .setAddress {
    .dial {
      .dialog-footer {
        text-align: right;
      }
      .selectDelivery {
        margin: 0 0 10px 10%;
      }
    }
  }
</style>
