<!--
 * @author: 2500594037@qq.com
 * @since: 2024-1-6
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
                    <span class="logoT">康无忧</span> <span class="line"></span> <span class="logoText">您身边的好药房</span>
                </span>
                <br>
                <span class="loginBox">
                    <ul class="type">
                        <li data-selectType="/online" class="Tli">
                            <el-radio-group v-model="chargeLoginType" size="large" @change="selectType">
                                <el-radio class="but" :class="{butColor : actionType}" label="账号登录"></el-radio>
                                <el-radio class="but" :class="{butColor : actionType === false}" label="验证码登录"></el-radio>
                            </el-radio-group>
                        </li>
                    </ul>
                    <span class="line"></span>
                    <div v-show="VcodeLogin">
                        <el-input class="inputT" placeholder="请输入手机号码" v-model="phone" :prefix-icon="Cellphone"></el-input>
                        <br>
                        <el-input class="inputP" placeholder="请输入短信验证码" v-model="VCode" :prefix-icon="Lock"></el-input>
                        <el-button class="getCode" @click="getCode">获取验证码</el-button>
                        <p class="checkBox">
                            <el-checkbox size="large" v-model="CState" @change="checkBoxChange"></el-checkbox> 我已阅读并同意 <span class="text1">《用户协议》</span> 和 <span class="text1">《隐私协议》</span> ，未注册的手机号将自动创建账号
                        </p>
                        <el-button class="loginBtn" ref="loginBth" @click="handelLogin">登录</el-button>
                    </div>
                    <div v-show="passLogin">
                        <el-input class="inputT" placeholder="请输入账号" v-model="account" :prefix-icon="User"></el-input>
                        <br>
                        <el-input class="passInputP" placeholder="请输入密码" v-model="password" :prefix-icon="Lock"></el-input>
                        <p class="checkBox">
                            <el-checkbox size="large" v-model="CPState" @change="passCheckBoxChange"></el-checkbox> 我已阅读并同意 <span class="text1">《用户协议》</span> 和 <span class="text1">《隐私协议》</span>
                        </p>
                        <el-button class="loginBtn PLB" ref="PLB" @click="handelPassLogin">登录</el-button>
                    </div>
                </span>

            </el-main>
            <el-footer class="foot">
                <!--<br>-->
                <span class="footTwo">© 2024 康无忧 京ICP备2024044988号</span><span class="footOne"> <span class="link" @click="showContactUs">联系我们</span> <span class="link" @click="showJoinTheCommunity"></span> </span>

            </el-footer>
        </el-container>

    </el-container>
    <div class="contactUs" v-show="contactUs">
        <div class="Smegma" @click="showContactUs"></div>
        <div class="imgBox">
            <img src="../assets/img/login/contactUs.png">
        </div>
    </div>
</template>

<script setup>
    import { Cellphone, Lock, User } from "@element-plus/icons-vue";
    import {onBeforeMount, ref} from "vue";
    import {adminLogin, customerLogin, getAuthCode} from "../apis/login/index.js";
    import {ElLoading, ElMessage} from "element-plus";
    import router from "../router/index.js";

    onBeforeMount(async () => {
        if (localStorage.getItem('token')) {
            ElMessage.success("已经登录啦");
            // await router.replace({path: "/home"});
        }
    })

    const userInfo = ref({
        id: null,
        telephone: null,
        name: null,
        address: null,
        password: null,
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
    let CPState = ref(false);
    const passCheckBoxChange = () => {
        const PLB = document.getElementsByClassName("PLB")[0];
        if(CPState.value) {
            PLB.style.backgroundColor = "#2365F3";
        }else {
            PLB.style.backgroundColor = "#8793AC";
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

    let account = ref('');
    let password = ref('');
    const handelPassLogin = async () => {
        if(!CPState.value) {
            ElMessage.warning("请先同意用户协议和隐私协议");
            return ;
        }
        if (account.value === "") {
            ElMessage.warning("请输入账号");
            return ;
        }
        if (password.value === "") {
            ElMessage.warning("请输入密码");
            return ;
        }
        const loading = ElLoading.service({
            lock: true,
            text: '登录中，请稍后...',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        customerLogin({
            telephone: account.value,
            password: password.value,
        }).then(res => {
            if (res.code === "200") {
                console.log("登录成功", res);
                userInfo.value = res.items[0];
                localStorage.setItem("customer", JSON.stringify(userInfo.value));
                localStorage.setItem("admin", "false");
                ElMessage.success("登录成功");
                loading.close();
                router.replace({path: "/home"});
            } else {
                // 尝试管理员登录
                adminLogin({
                    name: account.value,
                    password: password.value,
                }).then(res => {
                    if (res.code === "200") {
                        console.log("登录成功", res);
                        userInfo.value = res.items[0];
                        localStorage.setItem("customer", JSON.stringify(userInfo.value));
                        localStorage.setItem("admin", "true");
                        ElMessage.success("登录成功");
                        loading.close();
                        router.replace({path: "/home"});
                    } else {
                        loading.close();
                        ElMessage.warning(res.msg);
                    }
                }).catch(err => {
                    loading.close();
                    ElMessage.error("账号或密码错误！");
                });
            }
        }).catch(err => {
            loading.close();
            ElMessage.error("登录失败");
            console.log("登录失败", err);
        });
    };

    let contactUs = ref(false);
    function showContactUs() {
        contactUs.value = !contactUs.value;
    }

    let chargeLoginType = ref("账号登录");
    let passLogin = ref(true);
    let VcodeLogin = ref(false);
    let actionType = ref(true);
    function selectType(e) {
        if (e === '账号登录') {
            actionType.value = true;
            passLogin.value = true;
            VcodeLogin.value = false;
        } else {
            actionType.value = false;
            VcodeLogin.value = true;
            passLogin.value = false;
        }
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
        .logoT {
          color: #333333;
          font-size: 26px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          position: relative;
          top: -10px;
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
        .type {
          margin: 30px 0 -14px 0;
          .Tli {
            display: inline-block;
            margin-left: -40px;
            border: none;
            .but {
              font-family: PingFang SC-Bold, PingFang SC;
              font-weight: bold;
              color: #333333;
              line-height: 0px;
              opacity: 1;
              :deep(.el-radio__input) {
                display: none !important;
              }
              :deep(.el-radio__label) {
                font-size: 18px !important;
              }
            }
            .butColor {
              border-bottom: 3px solid #2365F3;
            }
          }
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
        .passInputP {
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
