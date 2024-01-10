<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-07
 * @description: 底部组件
-->
<template>
    <div class="foot">
        <div class="copyright">
        <span class="text">由康无忧提供技术支持
            <span class="linkText" @click="showContactUs">联系我们</span>
        </span>
        </div>
        <div class="contactUs" v-show="contactUs">
            <div class="Smegma" @click="showContactUs"></div>
            <div class="imgBox">
                <img src="../assets/img/homeFoot/contactUs.png">
            </div>
        </div>
    </div>

</template>

<script setup>
    import {ref} from "vue";

    let contactUs = ref(false);
    function showContactUs() {
        contactUs.value = !contactUs.value;
    }

</script>

<style lang="less" scoped>
  .foot{
    position: fixed;
    bottom: 0;
    width: 100%;
    .copyright{
      text-align: center;
      .text{
        font-size: 12px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        .linkText {
          cursor: pointer;
          font-size: 12px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #6F7FA1;
        }
      }
    }
    .contactUs {
      .Smegma {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,.4);
        z-index: 3;
      }
      .imgBox {
        display: block;
        width: 400px;
        height: 380px;
        margin: -50% auto;
        // 改变层级
        position: relative;
        top:250px;
        background-color: #D3E0FD;
        z-index: 3;
        img{
          width: 100%;
        }
      }
    }
  }

</style>
