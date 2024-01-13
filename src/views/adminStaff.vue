<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-12
 * @description: 员工管理
-->
<template>
    <div class="adminStaff">
        <div class="select">
            <el-checkbox label="展示密码" v-model="showPassword"></el-checkbox>
            <span>
                <el-input
                        placeholder="请输入员工号"
                        prefix-icon="el-icon-search"
                        size="default"
                        style="width: 200px"
                        v-model="searchId"
                        @keyup.enter.native="getById"
                ></el-input>
                <el-button type="primary" size="default" @click="getById">搜索</el-button>
            </span>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed  prop="id" label="员工号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="duties" label="职务"></el-table-column>
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
                            v-show="scope.row.duties !== '超级管理员'"
                            @click="deleteA(scope.$index)"
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
            + 新增员工
        </el-button>
        <div class="addSBox">
            <el-dialog :title = 'isEdit ? "维护员工信息" : "新增员工"' v-model="showAB" width="40%" center class="add" :close-on-click-modal="false" :before-close="showABClose">
                <el-form :model="addFrom" :rules="rules" label-width="110px">
                    <el-form-item v-if="!isEdit" label="员工手机号" prop="id">
                        <el-input v-model="addFrom.id"></el-input>
                    </el-form-item>
                    <el-form-item v-else label="员工编码">
                        <el-input v-model="addFrom.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="员工姓名" prop="name">
                        <el-input v-model="addFrom.name"></el-input>
                    </el-form-item>
                    <el-form-item label="权限密码" prop="password">
                        <el-input v-model="addFrom.password"></el-input>
                    </el-form-item>
                    <el-form-item label="员工职位" prop="duties">
                        <el-select v-model="addFrom.duties" placeholder={{addFrom.duties}} :disabled="addFrom.duties === '超级管理员'">
                            <el-option label="店长" value="店长"></el-option>
                            <el-option label="药师" value="药师"></el-option>
                            <el-option label="销售" value="销售"></el-option>
                            <el-option label="实习生" value="实习生"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showABClose">取 消</el-button>
                    <el-button type="primary" v-if="!isEdit" @click="addABOk">添 加</el-button>
                    <el-button type="primary" v-else @click="changeAMBOk">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
    import {onBeforeMount, ref} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";
    import {addS, delS, editS, getAllStaffs, getByTelephone} from "../apis/admin/admin.js";

    let tableData = ref([{
        id: '123456789',
        name: '张三',
        duties: "药师",
        password: "123456",
    }]);

    function getAllStaff() {
        getAllStaffs().then(res => {
            if (res.code === "200") {
                tableData.value = res.items;
            } else {
                ElMessage.error('获取所有店员失败!');
            }
        })
    }

    onBeforeMount(() => {
        getAllStaff();
    });

    let showPassword = ref(false);

    let searchId = ref('');
    function getById() {
        if (searchId.value === '') {
            getAllStaff();
            return;
        }
        getByTelephone({
            telephone: searchId.value
        }).then(res => {
            if (res.code === "200") {
                tableData.value = res.items;
            } else {
                ElMessage.error(res.msg);
            }
        })
    }

    let isEdit = ref(false);
    let showAB = ref(false);
    let addFrom = ref({
        id: '',
        name: '',
        duties: "药师",
        password: "",
    });
    function onAddItem() {
        addFrom.value = {
            id: '',
            name: '',
            duties: "药师",
            password: "",
        };
        isEdit.value = false;
        showAB.value = true;
    }
    function showABClose() {
        showAB.value = false;
    }
    function deleteA(index) {
        ElMessageBox.confirm('此操作将永久删除该员工, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            delS(
                tableData.value[index]
            ).then(res => {
                if (res.code === "200") {
                    ElMessage.success('删除成功!');
                    getAllStaff();
                } else {
                    ElMessage.error('删除失败!');
                }
            })
        }).catch(() => {
            console.log('已取消删除');
        });
    }
    function showEdit(index) {
        isEdit.value = true;
        showAB.value = true;
        addFrom.value = JSON.parse(JSON.stringify(tableData.value[index]));
    }
    const rules = {
        id: [
            { required: true, message: '请输入员工号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ],
        name: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
        ],
        duties: [
            { required: true, message: '请输入员工职务', trigger: 'blur' },
            { validator: (rule, value, callback) => {
                    if (value === '超级管理员') {
                        callback(new Error('不允许添加“超级管理员”'));
                    } else {
                        callback();
                    }
                }, trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入员工密码', trigger: 'blur' },
        ],
    };

    function addABOk() {
        addS(addFrom.value).then(res => {
            if (res.code === "200") {
                ElMessage.success('添加成功!');
                getAllStaff();
                showAB.value = false;
            } else {
                ElMessage.error(res.msg);
            }
        })
    }

    function changeAMBOk() {
        editS(addFrom.value).then(res => {
            if (res.code === "200") {
                ElMessage.success('修改成功!');
                getAllStaff();
                showAB.value = false;
            } else {
                ElMessage.error(res.msg);
            }
        })
    }
</script>

<style lang="less" scoped>
  .adminStaff {
    height: calc(100vh - 110px);
    overflow: auto;
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
    .el-table {
      max-height: calc(100vh - 180px);
      overflow: auto;
      z-index: 0;
    }
    .addSBox {
      .add {
        .dialog-footer {
          text-align: right;
        }
      }
    }
  }
</style>
