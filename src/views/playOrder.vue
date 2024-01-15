<template>
    <div class="settlementBox">
        <el-dialog title = "支付订单" width="40%" center class="play" :close-on-click-modal="false" :before-close="showACClose">
            <ul class="type">
                <li data-selectType="/online">
                    <el-radio-group v-model="chargePlayType" size="large" @change="selectType">
                        <el-radio label="在线支付"></el-radio>
                        <el-radio label="对公汇款"></el-radio>
                    </el-radio-group>
                </li>
            </ul>
            <div class="onLine" v-show="showOnline">
                <div class="left">
                    <ul>
                        <li>支付金额</li>
                        <li style="position: relative; top: 16px;">支付方式</li>
                    </ul>
                </div>
                <div class="right">
                    <ul>
                        <li>
                            <el-input v-model="orderMsg.playMeny" placeholder="0.00" class="chargeInput" disabled>
                                <template #append>
                                    <span class="chargeIcon">元</span>
                                </template>
                            </el-input>
                        </li>
                        <li class="WXPlay">
                            <el-radio-group v-model="chargeType" size="large">
                                <el-radio-button label="支付宝"><img class="WXPImg" src="../assets/img/play/ZFB.png" alt="支付宝支付"/>
                                </el-radio-button>
                                <el-radio-button label="微信支付" class="marL"><img class="WXPImg" src="../assets/img/play/WXPlay.png" alt="微信支付"/>
                                </el-radio-button>
                            </el-radio-group>
                        </li>
                        <li>
                            <button class="playButton" @click="toWxSaasPay">立即支付</button>
                            <button class="playButton" @click="checkOk" style="margin-left: 10px">确认支付</button>
                        </li>
                    </ul>
                </div>
                <div class="QRCodeBox" v-show="showQRcode">
                    <span class="qrCodeImg"></span>
                    <span class="QRCodeText">
                    <span>支付金额
                        <span style="font-weight: bold; color: #EF7B3E; margin-left: 10px;">
                            ¥
                            <span style="font-size: 26px;">{{orderMsg.playMeny}}</span>
                        </span>
                        <br>
                        <span style="font-weight: 500; color: #999999;">使用{{chargeType === "微信支付" ? "微信" : "支付宝"}}扫码完成支付</span>
                    </span>
                </span>
                </div>
            </div>
            <div class="remittance" v-show="showRemittance">
                <div class="message">
                    <span class="MSGBox">请将充值金额汇入以下账户， 汇款后请联系客服，以便及时为您确认订单</span>
                    <div class="RemittanceAccount">
                        <span>收款户名：广州康无忧医药集团有限公司</span>
                        <br>
                        <span>收款银行：招商银行股份有限公司广州分行花都风神支行</span>
                        <br>
                        <span>收款账号：6214230431342806</span>
                        <br>
                        <span>银行代码：308581002249</span>
                        <br>
                        <span>备注：账号绑定的手机号</span>
                    </div>
                    <el-button class="RABth" @click="copyMsg">复制以上信息</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
    import {ref, toRefs, watch} from "vue";
    import {ElLoading, ElMessage} from "element-plus";
    import QRCode from "qrcodejs2-fix";
    import Clipboard from "clipboard";

    const props = defineProps({
        orderMsg: Object,
    })
    const {orderMsg} =toRefs(props)

    let chargePlayType = ref("在线支付");
    // 充值方式
    let chargeType = ref("支付宝");
    const WXPlayURL = "https://payapp.wechatpay.cn/sjt/qr/AQJ7DbguOtskDgoH3O60coFy";
    const aliPlayURL = "https://qr.alipay.com/fkx17594xzxuzzvqucazl86?t=1705301421677";
    let QRCodeUrl = ref("https://qr.alipay.com/fkx17594xzxuzzvqucazl86?t=1705301421677");
    let showOnline = ref(true);
    let showRemittance = ref(false);
    const selectType = function (e) {
        if (e === '对公汇款') {
            showOnline.value = false;
            showRemittance.value = true;
        } else {
            showOnline.value = true;
            showRemittance.value = false;
        }
    }
    let showQRcode = ref(false);
    function toWxSaasPay() {
        const loading = ElLoading.service({
            lock: true,
            text: "正在生成二维码...",
            background: "rgba(0, 0, 0, 0.7)"
        });
        let qrCodeImg = document.getElementsByClassName('qrCodeImg')[0];
        if (qrCodeImg.innerHTML) qrCodeImg.innerHTML = '';
        QRCodeUrl.value = chargeType.value === '支付宝' ? aliPlayURL : WXPlayURL;
        new QRCode(qrCodeImg, {
            width: 137,
            height: 137,
            text: QRCodeUrl.value,
            colorDark: '#000000',
            colorLight: '#ffffff',
            typeNumber: 0
        });
        showQRcode.value = !showQRcode.value;
        loading.close();
    }

    watch(chargeType, () => {
        if (showQRcode.value) {
            showQRcode.value = false;
            toWxSaasPay();
        }
    })

    function checkOk() {
        if(!showQRcode.value) {
            ElMessage.error("请完成支付后再进行确认");
            return;
        }
        let loading = ElLoading.service({
            lock: true,
            text: "正在检查支付情况，请稍后...",
            background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
            showQRcode.value = false;
            showRemittance.value = false;
            showOnline.value = true;
            loading.close();
            playOK();
            ElMessage.success("支付成功！");
        }, 2000)
    }

    function playOK() {
        // 订单状态更改为待发货
        // 更新购物车
    }

    const copyMsg = () => {
        let clipboard = new Clipboard(".RABth", {
            text: () => {
                return "收款户名：广州康无忧医药集团有限公司\n" +
                    "收款银行：招商银行股份有限公司广州分行花都风神支行\n" +
                    "收款账号：6214230431342806\n" +
                    "银行代码：308581002249\n" +
                    "备注：账号绑定的手机号\n"

            },
        });
        clipboard.on("success", () => {
            ElMessage.success("已复制到剪切板！");
            clipboard.destroy();
        });
        clipboard.on("error", () => {
            ElMessage.warning("该浏览器不支持自动复制,请手动复制！");
            clipboard.destroy();
        });
    }
</script>

<style lang="less" scoped>
  .settlementBox{
    height: calc(100vh - 100px);
    .play {
      li {
        margin: 5px 0 20px 0;
      }

      .type {
        border-bottom: #888888 1px solid;
        //padding-bottom: 10px;
        li {
          display: inline-block;
          margin: 0;
        }

        :deep(.el-radio__input) {
          display: none !important;
        }

        :deep(.el-radio__label){
          padding-left: 0;
        }
      }

      .onLine {
        padding-top: 10px;
        li{
          display: block;
        }
        li::marker {
          display: none;
        }
        .left {
          display: inline-block;
          position: absolute;
        }

        .right {
          display: inline-block;
          margin-top: -5px;
          margin-left: 70px;

          .WXPlay {
            :deep(.el-radio-group) {
              .el-radio-button {
                --el-radio-button-checked-bg-color: none;

                .el-radio-button__inner {
                  display: inline-block;
                  width: 100px;
                  height: 40px;
                  margin-right: 10px;

                  .WXPImg {
                    transform: scale(0.6);
                    position: relative;
                    top: -15px;
                    left: -38px;
                  }
                }
              }
            }

            .marL {
              border-left: 1px solid rgba(0, 0, 0, 0.1);
            }
          }

          .chargeIcon {
            font-weight: bold;
            color: #333333;
            line-height: 0;
          }

          .playButton {
            width: 100px;
            height: 38px;
            background: #2365F3;
            color: white;
            border-radius: 0;
            border: 0;
            opacity: 1;
          }
        }

        .QRCodeBox {
          display: inline-block;
          width: 96%;
          height: 138px;
          margin-top: 20px;
          background: #F5F7F9;
          border-radius: 0;
          padding: 10px;

          .qrCodeImg {
            display: inline-block;
            width: 138px;
            height: 138px;
            //border: #888888 1px solid;
          }

          .QRCodeText {
            font-size: 14px;
            font-weight: 500;
            color: #333333;
            display: inline-block;
            margin-left: 20px;
            position: relative;
            top: -50px;
          }
        }
      }

      .remittance {
        .message {
          .MSGBox {
            display: inline-block;
            padding: 5px;
            background-color: #e5f6fc;
            margin-top: 5px;
          }

          .RemittanceAccount {
            width: 430px;
            height: 200px;
            margin: 10px 0;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

            span {
              line-height: 40px;
              margin-left: 20px;
            }
          }

          .RABth {
            height: 40px;
            background: #2365F3;
            color: white;
            border-radius: 0;
            border: 0;
            opacity: 1;
            margin-left: 20px;
            margin-top: 10px;
          }
        }
      }
    }
  }
</style>
