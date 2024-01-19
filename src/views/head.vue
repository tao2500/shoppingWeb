<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-07
 * @description: 头部组件
-->
<template>
    <el-container>
        <el-header>
            <div class="h_logo" @click="saveNavState">
                <span class="logo">康无忧</span>
                <span class="point"></span>
                <span class="text">线上药房</span>
                <span class="line"></span>
                <span class="text textTwo">关爱您的健康</span>
            </div>
            <head-nav></head-nav>
            <div class="company">
                <div class="c_img">
                    <img src="../assets/img/homeHead/wang.jpg" @click="listShow = !listShow"/>
                </div>
                <span class="c_name" @click="listShow = !listShow">{{ userInfo.name }}</span>
                <el-icon class="below">
                    <ArrowDown @click="listShow = !listShow"/>
                </el-icon>
                <div class="logOutBox" v-show="listShow">
                    <div class="Smegma" @click="listShow = !listShow"></div>
                    <div class="LBPhone">欢迎：{{ userInfo.name }}</div>
                    <div class="upDataMsg" v-show="!userInfo.duties" @click="upDataMsg">编辑资料</div>
                    <span class="logOutBoxLine"></span>
                    <p class="logout" @click="logOut">退出登录</p>
                </div>
            </div>
        </el-header>
        <el-dialog title="编辑资料" v-model="editMsgBox" width="35%" center class="charge" :close-on-click-modal="false" :before-close="editClose">
            <el-form :model="editMsg" ref="form" label-width="70px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editMsg.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                    <el-input v-model="editMsg.telephone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="editMsg.address"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="edit">修 改</el-button>
                <el-button @click="editClose">取 消</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
    import {onBeforeMount, ref} from 'vue';
    import {ElMessage} from 'element-plus';
    import {ArrowDown} from "@element-plus/icons-vue";
    import router from "../router/index.js";
    import headNav from "./headNav.vue";
    // import Login from "./myLogin.vue";
    import {editCustomer} from "../apis/customer/customer.js";

    export default {
        name: 'MyHead',
        components: {
            ArrowDown,
            headNav,
        },
        setup() {
            onBeforeMount(async () => {
                if (!localStorage.getItem('customer')) {
                    ElMessage.warning('请先登录');
                    await router.replace({path: "/login"});
                }
            });
            const userInfo = JSON.parse(localStorage.getItem("customer")) || ref({
                id: '',
                telephone: '',
                name: '暂未登录',
                address: '',
                duties: '',
            })
            let editMsg = ref({
                id: '',
                telephone: '',
                name: '',
                address: '',
            });
            let listShow = ref(false);
            const logOut = () => {
                localStorage.removeItem('customer');
                localStorage.removeItem('admin');
                ElMessage.success('已退出登录');
                listShow.value = false;
                router.replace({path: "/login"})
            };
            const showLoginPage = async () => {
                let localToken = localStorage.getItem('token') || '';
                await router.replace({path: "/login"})
            };
            const saveNavState = () => {
                if(router.currentRoute.value.fullPath === '/home' || router.currentRoute.value.fullPath === '/home/'){
                    location.reload();
                    return
                }
                router.replace({path: "/home"})
            }
            let editMsgBox = ref(false);
            function upDataMsg() {
                editMsg.value = JSON.parse(JSON.stringify(userInfo));
                editMsgBox.value = true;
            }
            const editClose = () => {
                editMsgBox.value = false;
            };
            function edit() {
                editCustomer(editMsg.value).then(res => {
                    if (res.code === "200") {
                        ElMessage.success('修改成功');
                        editClose();
                        localStorage.setItem('customer', JSON.stringify(editMsg.value));
                        userInfo.value = JSON.parse(JSON.stringify(editMsg.value));
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    } else {
                        ElMessage.error(res.msg);
                    }
                });
            }

            return {
                userInfo,
                logOut,
                listShow,
                showLoginPage,
                saveNavState,
                upDataMsg,
                editMsgBox,
                editClose,
                editMsg,
                edit,
            };
        }
    };
</script>

<style lang="less" scoped>
  .el-container {
    height: 100%;
  }

  .el-header {
    height: 70px !important;
    background: #2365f3;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding-left: 0px;
    align-items: center;

    .h_logo {
      cursor: pointer;
      height: 54px;
      overflow: inherit;
      margin-left: 30px;
      margin-top: 16px;
      float: left;
      display: flex;

      .logo{
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 36px;
      }

      .point {
        width: 4px;
        height: 4px;
        background: #FFFFFF;
        border-radius: 50%;
        opacity: 1;
        margin-top: 18px;
        margin-left: 10px;
      }

      .line {
        width: 0px;
        height: 14px;
        opacity: 0.3;
        border: 1px solid #FFFFFF;
        margin-top: 13px;
        margin-left: 20px;
      }

      .text {
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 41px;
        margin-left: 10px;
      }

      .textTwo {
        margin-left: 20px;
      }
    }

    .company {
      display: flex;
      line-height: 40px;
      position: relative;
      cursor: pointer;
      z-index: 3;
      .c_img {
        width: 40px;
        height: 40px;
        margin-right: 20px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      span {
        font-size: 16px;
        font-family: PingFangSC-Regular,
        PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }

      .below {
        display: inline-block;
        margin-top: 10px;
        margin-left: 12px;
      }

      .logOutBox {
        width: 158px;
        height: 126px;
        background: #FFFFFF;
        box-shadow: 0 5px 15px 1px rgba(51,51,51,0.15);
        opacity: 1;
        position: absolute;
        top: 55px;
        right: -16px;
        color: black;
        padding: 0 15px;
        .Smegma {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          //background-color: rgba(0,0,0,.4);
          z-index: -1;
        }
        .LBPhone {
          font-size: 20px;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
          -webkit-background-clip: text;
          margin-top: 20px;
        }
        .upDataMsg {
          color: #2365F3;
          margin: 10px 0 -20px 0;
        }
        .logOutBoxLine{
          display: inline-block;
          width: 156px;
          height: 0;
          opacity: 1;
          border: 1px solid #F4F4F4;
          //margin-top: -20px;
        }
        .logout {
          font-size: 19px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #EA7F48;
          -webkit-background-clip: text;
          margin-top: -5px;
        }
      }
    }
  }

  :deep(.el-submenu__title i) {
    color: #333333;
  }

  :deep(.el-submenu__title:hover) {
    background: #fafafa;
  }

  :deep(.el-submenu .el-menu) {
    background: #fafafa;
  }

  .el-submenu__title * {
    font-size: 14px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
  }

  :deep(.el-submenu .el-menu-item) {
    padding-left: 54px !important;
    font-size: 14px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: #333333;
  }

  :deep(.el-menu-item.is-active) {
    font-size: 14px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
  }

  .charge {
    .dialog-footer {
      text-align: right;
    }
  }
</style>
