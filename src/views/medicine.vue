<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-08
 * @description: 药品展示组件
-->
<template>
    <el-card class="medicineBox">
        <img src= "../assets/img/homeHead/wang.jpg" alt="商品照片">
        <p>{{medic.name}} - {{medic.size}}</p>
        <p>库存：{{medic.count}} </p>
        <p>
            {{medic.price}} 元<button v-show="cart.count <= 0 && cart.count !== ''" class="addCartBut" @click="addCart('addOne')">加入购物车</button>
            <span class="addSub" v-if="cart.count > 0 || cart.count === ''" @drop="deleteCart">
                <RemoveFilled class="BTH" @click="addCart('sub')"></RemoveFilled>
                <span class="count"><input type="number" v-model="cart.count"/></span>
                <CirclePlusFilled class="BTH" @click="addCart('add')"></CirclePlusFilled>
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
        if(cart.value.count <= 0 && oVal.value > 0) {
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
    width: 12vw;
    p {
      font-size: 14px;
        margin: 0;
    }
    img{
      width: 10vw;
    }
    .addCartBut {
      height: 23px;
      float: right;
      margin-right: 10px;
      background-color: #6F7FA1;
      color: #fff;
      border: none;
      border-radius: 5px;
    }
    .addSub {
        float: right;
        margin-right: 10px;
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
