<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-08
 * @description: 药品展示组件
-->
<template>
    <el-card class="medicineBox">
        <img src= "../assets/img/homeHead/wang.jpg" alt="商品照片">
        <span class="txt">
            <p>{{medic.name}} - {{medic.size}}</p>
            <p>
                库存:{{medic.count}}
                <span style="float: right">单价:{{medic.price}} 元</span>
            </p>
        </span>

        <p>
            <button v-show="cart.count <= 0 && cart.count !== '' && cart.count !== null" class="addCartBut" @click="addCart('addOne')">加入购物车</button>
            <span class="addSub" v-if="cart.count > 0 || cart.count === '' || cart.count === null" @drop="deleteCart">
                <el-input-number v-model="cart.count" :min="0" :max="medic.count" size="small" label="数量"></el-input-number>
<!--                <RemoveFilled class="BTH" @click="addCart('sub')"></RemoveFilled>-->
<!--                <span class="count"><input type="number" v-model="cart.count"/></span>-->
<!--                <CirclePlusFilled class="BTH" @click="addCart('add')"></CirclePlusFilled>-->
            </span>
        </p>
    </el-card>
</template>

<script setup>
    import {onBeforeMount, ref, toRefs, watch} from "vue";
    import { CirclePlusFilled, RemoveFilled } from  "@element-plus/icons-vue";
    import {
        addShoppingCart,
        changeCount,
        deleteShoppingCart,
    } from '../apis/shoppingCart/shoppingCart.js';
    import {ElMessage} from "element-plus";


    const props = defineProps({
        medic: Object,
    })
    const {medic} =toRefs(props)

    let cart = ref({
        id: 1,
        customerId: 1,
        barCode:  1,
        count: 0,
        status: "有效",
        joinTime: "2024-01-08"
    })

    onBeforeMount(() => {
        cart.value.joinTime =  new Date().toLocaleString()
        cart.value.customerId = JSON.parse(localStorage.getItem("customer")).id
        cart.value.barCode = medic.value.barCode
    })

    function addCart(msg) {
        if (msg === 'addOne'){
            cart.value.count = 1;
            addShoppingCart(cart.value).then((res) => {
                if (res.code !== "200") {
                    ElMessage.error(res.msg)
                }
            })
        } else if (msg === 'add'){
            cart.value.count++;
        } else if(cart.value.count > 0){
            cart.value.count--;
        }
    }

    function deleteCart() {
        deleteShoppingCart(cart.value).then((res) => {
            if (res.code !== "200") {
                ElMessage.error(res.msg)
            }
        })
    }

    function undateCart() {
        changeCount(cart.value).then((res) => {
            if (res.code !== "200") {
                ElMessage.error(res.msg)
            }
        })
    }

    let oVal = ref(0)
    watch(cart.value, (newValue, oldValue) => {
        if (newValue.count > medic.value.count) {
            ElMessage.error("库存不足")
            cart.value.count = medic.value.count
        }
        if(cart.value.count <= 0 && (oVal.value > 0 || oVal.value === null) && cart.value.count !== null) {
            deleteCart()
        }
        if(cart.value.count >= 1 && oVal.value >= 1) {
            undateCart()
        }
        oVal.value = cart.value.count
    })
</script>

<style lang="less" scoped>
  .medicineBox {
    min-width: 200px;
    width: 12vw;
    .txt {
      display: inline-block;
      min-width: 163px;
      min-height: 60px;
    }
    p {
      font-size: 14px;
        margin: 0;
    }
    img{
      min-width: 163px;
      width: 10vw;
    }
    .addCartBut {
      width: 120px;
      height: 23px;
      //float: right;
      //margin-right: 10px;
      margin-top: 10px;
      margin-left: 20px;
      background-color: #6F7FA1;
      color: #fff;
      border: none;
      border-radius: 5px;
    }
    .addSub {
        //float: right;
        //margin-right: 10px;
        margin-left: 20px;
      .el-input-number {
        margin-top: 10px;
        width: 120px;
        height: 23px;
      }
        .BTH {
            width: 23px;
            height: 23px;
            font-weight: 600;
            border-radius: 50%;
            background-color: #fff;
            color: #000;
        }

        .count {
          input {
            width: 30px;
            height: 23px;
            border: none;
            text-align: center;
            position: relative;
            top: -6px;
          }
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
        }
    }
  }
</style>
