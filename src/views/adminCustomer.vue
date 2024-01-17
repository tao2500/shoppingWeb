<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-13
 * @description: 顾客管理
-->
<template>
    <div class="adminCustomer">
        <div class="select">
            <el-checkbox label="展示密码" v-model="showPassword"></el-checkbox>
            <span>
                <el-input
                        placeholder="请输入顾客手机号"
                        prefix-icon="el-icon-search"
                        size="default"
                        style="width: 200px"
                        v-model="searchTelephone"
                        @keyup.enter.native="getByTelephone"
                ></el-input>
                <el-button type="primary" size="default" @click="getByTelephone">搜索</el-button>
            </span>

        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed  prop="telephone" label="顾客手机号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="password" v-if="showPassword" label="登录密码" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button
                            link
                            type="primary"
                            size="small"
                            @click="showEdit(scope.$index)"
                    >
                        编辑
                    </el-button>
                    <el-button
                            link
                            type="primary"
                            size="small"
                            @click="deleteC(scope.$index)"
                    >
                        注销
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button link
                   type="primary"
                   size="small"
                   @click="onAddItem">
            + 新增顾客
        </el-button>
        <div class="addCBox">
            <el-dialog :title = 'isEdit ? "维护会员信息" : "注册会员"' v-model="showAC" width="40%" center class="add" :close-on-click-modal="false" :before-close="showACClose">
                <el-form :model="addFrom" :rules="rules" label-width="110px">
                    <el-form-item label="会员电话" prop="id">
                        <el-input v-model="addFrom.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="会员姓名" prop="name">
                        <el-input v-model="addFrom.name"></el-input>
                    </el-form-item>
                    <el-form-item label="会员地址" prop="address">
                        <el-input v-model="addFrom.address"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码" prop="password">
                        <el-input v-model="addFrom.password"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showACClose">取 消</el-button>
                    <el-button type="primary" v-if="!isEdit" @click="addACOk">添 加</el-button>
                    <el-button type="primary" v-else @click="changeACOk">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
    import {onBeforeMount, ref} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";
    import {addC, delC, delS, editC, getAllCustomer, getByCTelephone} from "../apis/admin/admin.js";

    const tableData = ref([{
        id: "12345678901",
        telephone: "12345678901",
        name: "测试人员",
        address: "测试地址",
        password: "123456"
    }])

    function getAllC() {
        getAllCustomer().then(res => {
            if (res.code === "200") {
                tableData.value = res.items;
            } else {
                ElMessage.error(res.msg);
            }
        })
    }

    onBeforeMount(() => {
        getAllC();
    })

    let showPassword = ref(false)
    let searchTelephone = ref("")
    function getByTelephone() {
        if (searchTelephone.value === "") {
            getAllC();
            return;
        }
        getByCTelephone({
            telephone: searchTelephone.value
        }).then(res => {
            if (res.code === "200") {
                tableData.value = res.items;
            } else {
                ElMessage.error(res.msg);
            }
        })
    }

    let isEdit = ref(false)
    let showAC = ref(false)
    let addFrom = ref({
        id: "",
        telephone: "",
        name: "",
        address: "",
        password: ""
    })
    function showEdit(index) {
        isEdit.value = true;
        showAC.value = true;
        addFrom.value = JSON.parse(JSON.stringify(tableData.value[index]));
    }

    function onAddItem() {
        isEdit.value = false;
        showAC.value = true;
        addFrom.value = {
            id: "",
            telephone: "",
            name: "",
            address: "",
            password: ""
        }
    }

    function showACClose() {
        showAC.value = false;
    }
    function deleteC(index) {
        ElMessageBox.confirm('此操作将永久删除该顾客, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            delC(
                tableData.value[index]
            ).then(res => {
                if (res.code === "200") {
                    ElMessage.success('删除成功!');
                    getAllC();
                } else {
                    ElMessage.error(res.msg);
                }
            })
        }).catch(() => {
            console.log('已取消删除');
        });
    }

    const rules = {
        id: [
            { required: true, message: '请输入员工号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
        ],
        address: [
            { required: true, message: '请输入员工地址', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
        ],
    }

    function addACOk () {
        addC(addFrom.value).then(res => {
            if (res.code === "200") {
                ElMessage.success('添加成功!');
                getAllC();
                showAC.value = false;
            } else {
                ElMessage.error(res.msg);
            }
        })
    }

    function changeACOk () {
        editC(addFrom.value).then(res => {
            if (res.code === "200") {
                ElMessage.success('修改成功!');
                getAllC();
                showAC.value = false;
            } else {
                ElMessage.error(res.msg);
            }
        })
    }
</script>

<style lang="less" scoped>
    .adminCustomer {
      height: calc(100vh - 110px);
      overflow: auto;
      .el-table {
        max-height: calc(100vh - 180px);
        z-index: 0;
      }
      .select {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .el-checkbox {
          z-index: 0;
        }
        .el-button {
          margin-left: 10px;
        }
      }
      .addCBox {
        .add {
          .dialog-footer {
            text-align: right;
          }
        }
      }
    }
</style>
