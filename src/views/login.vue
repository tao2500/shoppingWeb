<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-05
-->
<template>
    <el-container class="maLog">
        <el-aside class="left">
            <div class="title">
                <p style="font-weight: bold;"> 康无忧药房</p>
                <p>可信赖的好药房</p>
            </div>
            <div class="list">
                <span>
                    <span class="symbol"></span> <span class="listTitle">致力于健康</span>
                    <p class="text">我们致力于提供高质量的药品，只为您的健康</p>
                </span>
                <span>
                    <span class="symbol"></span> <span class="listTitle">客户至上</span>
                    <p class="text">我们始终将客户的需求放在首位，提供个性化的服务</p>
                </span>
                <span>
                    <span class="symbol"></span> <span class="listTitle">信任和诚实</span>
                    <p class="text">我们坚持诚实守信的原则，保证药品的质量，赢得客户的信任</p>
                </span>
            </div>
        </el-aside>
        <el-container>
            <el-main class="main">
                <span class="logo">
                     <img src="../assets/img/login/logo.png" /><span class="line"></span> <span class="logoText">您身边的好药房</span>
                </span>
                    <br>
                    <span class="loginBox">
                    <p class="loginType">验证码登录</p>
                    <span class="line"></span>
                    <br>
                    <el-input class="inputT" placeholder="请输入手机号码" v-model="phone" :prefix-icon="Cellphone"></el-input>
                    <br>
                    <el-input class="inputP" placeholder="请输入短信验证码" v-model="VCode" :prefix-icon="Lock"></el-input>
                    <el-button class="getCode" @click="getCode">获取验证码</el-button>
                    <p class="checkBox">
                        <el-checkbox size="large" v-model="CState" @change="checkBoxChange"></el-checkbox> 我已阅读并同意 <span class="text1">《用户协议》</span> 和 <span class="text1">《隐私协议》</span> ，未注册的手机号将自动创建账号
                    </p>
                    <el-button class="loginBtn" ref="loginBth" @click="handelLogin">登录</el-button>
                </span>

            </el-main>
            <div class="returnOfficial"><a class="returnOfficialText" href="http://zhizengzeng.com" target="_blank">返回商城首页</a></div>
            <el-footer class="foot">
                <!--<br>-->
                <span class="footTwo">© 2024 康无忧 京ICP备2024044988号</span><span class="footOne"> <span class="link" @click="showContactUs">联系我们</span> <span class="link" @click="showJoinTheCommunity"></span> </span>

            </el-footer>
        </el-container>

    </el-container>
    <div class="contactUs" v-show="contactUs">
        <div class="Smegma" @click="showContactUs"></div>
        <div class="imgBox">
            <img src="../assets/img/myFoot/contactUs.png">
        </div>
    </div>
    <div class="contactUs" v-show="joinTheCommunity">
        <div class="Smegma" @click="showJoinTheCommunity"></div>
        <div class="imgBox">
            <img src="../assets/img/myFoot/JoinTheCommunity.png">
        </div>
    </div>
</template>

<script setup>
    import {onBeforeMount, ref} from "vue";
    import {getAuthCode} from "../api/index.js";
    import {ElLoading, ElMessage} from "element-plus";
    import router from "../router/index.js";

    onBeforeMount(async () => {
        if (localStorage.getItem('token')) {
            ElMessage.success("已经登录啦");
            // await router.replace({path: "/my"});
        }
    })

    const userInfo = ref({
        id: null,
        unionid: null,
        user_name: "请先登录",
        user_phone: "请先登录",
        user_coin: 0,
        user_tokens_cnt: 0,
        vip_level: 0,
        vip_time: 0,
        myMoney: true,
        myTokenMoney: true,
        tokens_desc: 'Tokens余额：',
        tokens_val: '0  个',
    })

    let CState = ref(false);
    const checkBoxChange = () => {
        const loginBth = document.getElementsByClassName("loginBtn")[0];
        if(CState.value) {
            loginBth.style.backgroundColor = "#2365F3";
        }else {
            loginBth.style.backgroundColor = "#8793AC";
        }
    }
    let phone = ref('');
    let VCode = ref('');
    let RVCodeTime = ref(60);
    const getCode = async () => {
        if(RVCodeTime.value < 59) {
            ElMessage.warning("请等待" + RVCodeTime.value + "s后重试");
            return ;
        }
        if (phone.value === "") {
            ElMessage.warning("请输入手机号码");
            return ;
        }
        if (/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phone.value) === false) {
            ElMessage.warning("请输入正确的手机号码");
            return ;
        }
        const loading = ElLoading.service({
            lock: true,
            text: '正在发送验证码...',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        const { data } = await getAuthCode({type: 1, phone: phone.value});
        // yzm.value = data;
        const dom = document.getElementsByClassName("getCode")[0];
        let timer = null;
        if (data.code === 0){
            loading.close();
            ElMessage.success("验证码发送成功");
            timer = setInterval(() => {
                dom.innerHTML = "已发送(" + RVCodeTime.value + ")";
                RVCodeTime.value--;
                if (RVCodeTime.value <= 0) {
                    RVCodeTime.value = 59;
                    clearInterval(timer);
                    dom.innerHTML = "获取验证码";
                }
            }, 1000);
        } else {
            loading.close();
            ElMessage.error(data.msg);
            RVCodeTime.value = 59;
            clearInterval(timer);
            dom.innerHTML = "获取验证码";
        }
    };
    // 登录
    const handelLogin = async () => {
        if(!CState.value) {
            ElMessage.warning("请先同意用户协议和隐私协议");
            return ;
        }
        if (phone.value === "") {
            ElMessage.warning("请输入手机号码");
            return ;
        }
        if (/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phone.value) === false) {
            ElMessage.warning("请输入正确的手机号码");
            return ;
        }
        if (VCode.value === "") {
            ElMessage.warning("请输入验证码");
            return ;
        }
        const loading = ElLoading.service({
            lock: true,
            text: '登录中，请稍后...',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        let localOpenid = localStorage.getItem("openid") || "";
        const { data } = await getAuthCode({
            type: 2,
            phone: phone.value,
            yzm: VCode.value,
            openid: localOpenid,
        });
        if (data.code === 0) {
            userInfo.value = data.user;
            console.log("登录成功", {data});
            ElMessage.success("登录成功");
            localStorage.setItem("token", data.user.token);
            localStorage.setItem("createTime", data.app.created_at);
            localStorage.setItem("secret_key", data.app.secret_key);
            loading.close();
            await router.replace({path: "/my"});
        } else {
            loading.close();
            ElMessage.warning(data.msg);
            localStorage.removeItem("secret_key");
        }
        console.log("handelLogin", data);
    };

    let contactUs = ref(false);
    function showContactUs() {
        contactUs.value = !contactUs.value;
    }

    let joinTheCommunity = ref(false);
    function showJoinTheCommunity() {
        joinTheCommunity.value = !joinTheCommunity.value;
    }
</script>

<style lang="less" scoped>
  .maLog {
    height: calc(100vh);
    overflow: hidden;
    .left{
      background-image: url("../assets/img/login/loginLeftBack.png");
      background-repeat: no-repeat;
      background-size: 60% 100%;
      width: 60%;
      //width: 400px;
      color: white;
      padding: 5vh 28vw 4vh 3vw;
      overflow-y: hidden;
      .title {
        //font-size: 1.77vw;
        font-size: 2vw;
        line-height: 1.5vw;
        font-family: PingFang SC-Heavy;
      }
      .list {
        .symbol {
          display: inline-block;
          width: 0.5vw;
          height: 0.5vw;
          border-radius: 50%;
          opacity: 1;
          border: 2px solid #0efddc;
        }
        .listTitle{
          display: inline-block;
          font-size: 1.5vw;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          -webkit-background-clip: text;
          margin-top: 10px;
        }
        .text {
          //font-size: 0.7vw;
          font-size: 1vw;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          -webkit-background-clip: text;
        }
        span {
          margin-top: 40px;
        }
      }
    }
    .main{
      position: absolute;
      left:50%;
      top:50%;
      margin-left: 40px;
      margin-top:-260px;
      .logo{
        .line {
          display: inline-block;
          width: 0px;
          height: 24px;
          opacity: 1;
          border: 1px solid #F2F2F2;
          margin-left: 20px;
          position: relative;
          top: -4px;
        }
        .logoText {
          font-size: 26px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          -webkit-background-clip: text;
          position: relative;
          top: -10px;
          left: 20px;
        }
      }
      .loginBox{
        display: inline-block;
        width: 360px;
        .loginType {
          font-size: 20px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
          line-height: 0px;
          -webkit-background-clip: text;
          width: 100px;
          opacity: 1;
          padding-bottom: 20px;
          margin: 60px 0 -14px 0;
          border-bottom: 3px solid #2365F3;
        }
        .line {
          display: inline-block;
          width: 360px;
          height: 0;
          opacity: 1;
          border: 1px solid #F2F2F2;
        }
        .inputT {
          height: 48px;
          background: #FFFFFF;
          border-radius: 5px 5px 5px 5px;
          opacity: 1;
          border: 1px solid #E2E2E2;
          margin-top: 20px;
            font-size:16px;
        }
        .inputP {
          width: 235px;
          height: 48px;
          background: #FFFFFF;
          border-radius: 5px 5px 5px 5px;
          opacity: 1;
          border: 1px solid #E2E2E2;
          margin-top: 20px;
            font-size:16px;
        }
        .getCode {
          width: 115px;
          height: 48px;
          background: #FFFFFF;
          border-radius: 5px 5px 5px 5px;
          opacity: 1;
          border: 1px solid #E2E2E2;
          margin-left: 10px;
          margin-top: 20px;
          font-size: 16px;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #2365F3;
          line-height: 0;
          -webkit-background-clip: text;
        }
        .checkBox {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 0;
          -webkit-background-clip: text;
          .text{
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #2365F3;
            line-height: 0px;
            -webkit-background-clip: text;
          }
        }
        .loginBtn {
          width: 360px;
          height: 48px;
          background: #8793AC;
          color: white;
          border-radius: 5px 5px 5px 5px;
          opacity: 1;
          margin-top: 40px;
        }
      }
    }
    .returnOfficial {
      position: fixed;
      top: 3px;
      right: 10px;
      .returnOfficialText {
        cursor: pointer;
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #2365F3;
        margin-left: 10px;
        -webkit-background-clip: text;
      }
    }
    .foot{
      text-align: center;
      position: absolute;
      bottom: 6px;
      left: 50%;
      .footOne{
        .link {
          cursor: pointer;
          height: 20px;
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #2365F3;
          margin-left: 10px;
          -webkit-background-clip: text;
        }
      }
      .footTwo{
        display: inline-block;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-top: 5px;
        -webkit-background-clip: text;
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
      height: 400px;
      // 改变层级
      position: absolute;
      top: 100px;
      left: 45%;
      background-color: #D3E0FD;
      z-index: 3;
      img{
        width: 100%;
      }
    }
  }

  @media  screen and (min-width: 1600px) {
    .maLog {
      .left {
        width: 48%;
        padding: 10vw 23vw 0 2vw;
        .list{
          .listTitle {
            font-size: 2.1vh;
          }
          .text {
            font-size: 1.5vh;
          }
        }
      }
    }
  }
</style>
