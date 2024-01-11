<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-12
 * @description: 员工管理
-->
<template>
    <div class="adminStaff">
        <div class="select">
            <el-input
                    placeholder="请输入员工号"
                    prefix-icon="el-icon-search"
                    size="default"
                    style="width: 200px"
                    v-model="searchId"
            ></el-input>
            <el-button type="primary" size="default">搜索</el-button>
        </div>

        <el-table :data="tableData" style="width: 100%" max-height="250">
            <el-table-column fixed  prop="id" label="员工号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="duties" label="职务"></el-table-column>
            <el-table-column prop="password" label="登录密码" width="120"></el-table-column>
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
                            @click="deleteA(scope.$index)"
                    >
                        删除
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
                    <el-form-item label="员工职位" prop="duties">
                        <el-input v-model="addFrom.duties"></el-input>
                    </el-form-item>
                    <el-form-item label="权限密码" prop="password">
                        <el-input v-model="addFrom.password"></el-input>
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
    import {ref} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";

    let tableData = ref([{
        id: '123456789',
        name: '张三',
        duties: "销售",
        password: "123456",
    }]);
    let searchId = ref('');
    let isEdit = ref(false);
    let showAB = ref(false);
    let addFrom = ref({
        id: '',
        name: '',
        duties: "",
        password: "",
    });
    function onAddItem() {
        addFrom.value = {
            id: '',
            name: '',
            duties: "",
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
            tableData.value.splice(index, 1);
            ElMessage.success('删除成功!');
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
        showAB.value = false;
        tableData.value.push(addFrom.value);
    }

    function changeAMBOk() {
        showAB.value = false;
    }
</script>

<style lang="less" scoped>
  .adminStaff {
    height: calc(100vh - 100px);
    overflow: auto;
    .select {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
      .el-button {
        margin-left: 10px;
      }
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
