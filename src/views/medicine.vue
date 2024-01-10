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
            {{medic.price}} 元<button v-show="count <= 0" class="addCartBut" @click="addCart('addOne')">加入购物车</button>
            <span class="addSub" v-show="count > 0">
                <RemoveFilled class="BTH" @click="addCart('sub')"></RemoveFilled>
                <span class="count"><input type="number" v-model="count"/></span>
                <CirclePlusFilled class="BTH" @click="addCart('add')"></CirclePlusFilled>
            </span>
        </p>
    </el-card>

</template>

<script setup>
    import {ref, toRefs} from "vue";
    import { CirclePlusFilled, RemoveFilled } from  "@element-plus/icons-vue";


    const props = defineProps({
        medic: Object,
    })
    const {medic} =toRefs(props)

    let count = ref(0);
    function addCart(msg) {
        if (msg === 'addOne'){
            count.value = 1;
        } else if (msg === 'add'){
            count.value++;
        } else if(count.value > 0){
            count.value--;
        }
    }

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
