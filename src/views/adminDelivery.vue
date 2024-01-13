<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-13
 * @description: 运费管理
-->
<template>
    <div class="adminDelivery">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="配送类型" prop="type"></el-table-column>
            <el-table-column label="预收金额" prop="price"></el-table-column>
            <el-table-column label="适用城市" prop="cities"></el-table-column>
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
                            @click="deleteD(scope.$index)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-button link
                       type="primary"
                       size="small"
                       @click="onAddItem">
                + 新增运费规则
            </el-button>
        </div>
        <div class="addDBox">
            <el-dialog :title = 'isEdit ? "维护运费信息" : "新增运费规则"' v-model="dialogVisible" width="40%" center class="add" :close-on-click-modal="false">
                <el-form :model="fromDate" :rules="rules" label-width="80px">
                    <el-form-item label="配送类型" prop="type">
                        <el-input v-model="fromDate.type"></el-input>
                    </el-form-item>
                    <el-form-item label="预收金额" prop="price">
                        <el-input v-model="fromDate.price"></el-input>
                    </el-form-item>
                    <el-form-item label="适用城市" prop="cities">
                        <el-input v-model="fromDate.cities"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" v-if="isEdit" @click="editOk">保 存</el-button>
                    <el-button type="primary" v-else @click="addOk">添 加</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script setup>

    import {onBeforeMount, ref} from "vue";
    import {addD, addS, delD, delS, editD, editS, getAllFreight} from "../apis/admin/admin.js";
    import {ElMessage, ElMessageBox} from "element-plus";

    let tableData = ref([{
        id: '1',
        type: '同城闪送',
        price: '0',
        cities: '广州,深圳,珠海',
    }])

    onBeforeMount(() => {
        getAll()
    })

    function getAll() {
        getAllFreight().then(res => {
            if (res.code === "200") {
                tableData.value = res.items
            } else {
                this.$message.error(res.msg)
            }
        })
    }

    let fromDate = ref({
        id: '',
        type: '',
        price: '',
        cities: '',
    })
    let dialogVisible = ref(false)
    let isEdit = ref(false)
    let rules = ref({
        type: [
            {required: true, message: '请输入配送类型', trigger: 'blur'},
        ],
        price: [
            {required: true, message: '请输入预收金额', trigger: 'blur'},
        ],
        cities: [
            {required: true, message: '请输入适用城市', trigger: 'blur'},
        ],
    })

    function onAddItem() {
        fromDate.value = {
            id: '',
            type: '',
            price: '',
            cities: '',
        }
        isEdit.value = false;
        dialogVisible.value = true;
    }

    function showEdit(index) {
        fromDate.value = JSON.parse(JSON.stringify(tableData.value[index]))
        isEdit.value = true
        dialogVisible.value = true
    }

    function deleteD(index) {
        ElMessageBox.confirm('此操作将永久删除该运费规则, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            delD(
                tableData.value[index]
            ).then(res => {
                if (res.code === "200") {
                    ElMessage.success('删除成功!');
                    getAll()
                } else {
                    ElMessage.error('删除失败!');
                }
            })
        }).catch(() => {
            console.log('取消删除')
        });
    }

    function editOk() {
        editD(fromDate.value).then(res => {
            if (res.code === "200") {
                ElMessage.success('修改成功!');
                getAll();
                dialogVisible.value = false;
            } else {
                ElMessage.error(res.msg);
            }
        })
    }

    function addOk () {
        addD(fromDate.value).then(res => {
            if (res.code === "200") {
                ElMessage.success('添加成功!');
                getAll()
                dialogVisible.value = false;
            } else {
                ElMessage.error(res.msg);
            }
        })
    }
</script>

<style lang="less" scoped>
  .adminDelivery {
    height: calc(100vh - 110px);
    overflow: auto;
    .el-table {
      z-index: 0;
    }
    .addDBox {
      .add {
        .dialog-footer {
          text-align: right;
        }
      }
    }
  }
</style>
