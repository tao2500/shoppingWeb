<!--
 * @author: 2500594037@qq.com
 * @since: 2024-01-11
 * @description: 药品管理
-->
<template>
    <div class="adminMedicine">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed  prop="name" label="药品"></el-table-column>
            <el-table-column prop="size" label="规格"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="count" label="余量"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button
                            link
                            type="primary"
                            size="small"
                            @click="changeMed(scope.$index)"
                    >
                        编辑
                    </el-button>
                    <el-button
                            link
                            type="primary"
                            size="small"
                            @click="deleteMed(scope.$index)"
                    >
                        下架
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button link
                   type="primary"
                   size="default"
                   @click="addClick">
            + 新增药品
        </el-button>
        <div class="addMBox">
            <el-dialog :title = 'isEdit ? "维护药品信息" : "新增药品"' v-model="showAMB" width="40%" center class="add" :close-on-click-modal="false" :before-close="showAMBClose">
                <el-form :model="addFrom" ref="ruleFormRef" :rules="rules" label-width="110px">
                    <el-form-item v-if="!isEdit" label="药品编码" prop="barCode">
                        <el-input v-model="addFrom.barCode"></el-input>
                    </el-form-item>
                    <el-form-item v-else label="药品编码">
                        <el-input v-model="addFrom.barCode" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="药品图片" prop="imgSrc">
                        <el-input v-model="addFrom.imgSrc"></el-input>
                    </el-form-item>
                    <el-form-item label="药品名称" prop="name">
                        <el-input v-model="addFrom.name"></el-input>
                    </el-form-item>
                    <el-form-item label="药品类型" prop="type">
                        <el-input v-model="addFrom.type"></el-input>
                    </el-form-item>
                    <el-form-item label="药品功效" prop="effect">
                        <el-input v-model="addFrom.effect"></el-input>
                    </el-form-item>
                    <el-form-item label="药品数量" prop="count">
                        <el-input v-model="addFrom.count"></el-input>
                    </el-form-item>
                    <el-form-item label="药品规格" prop="size">
                        <el-input v-model="addFrom.size"></el-input>
                    </el-form-item>
                    <el-form-item label="药品价格" prop="price">
                        <el-input v-model="addFrom.price"></el-input>
                    </el-form-item>
                    <el-form-item label="药品有效期止" prop="expires">
                        <el-input v-model="addFrom.expires"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showAMBClose">取 消</el-button>
                    <el-button type="primary" v-if="!isEdit" @click="addAMBOk">上 架</el-button>
                    <el-button type="primary" v-else @click="editClick">保 存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {onBeforeMount, reactive, ref} from "vue";
    import type { FormInstance, FormRules } from 'element-plus'
    import { ElMessageBox } from 'element-plus'
    import {ElMessage} from "element-plus";
    import { getAllDrugs, editM, addM, delM } from "../apis/admin/admin.js";

    let tableData = ref([{
        barCode: '123456789',
        imgSrc: 'gml.jpg',
        name: '感冒灵',
        type: "处方药",
        effect: '发热',
        count: '265',
        size: '10g * 10',
        price: '23.00',
        expires: '2025',
    }]);

    onBeforeMount(() => {
        getAllDrug();
    })

    function getAllDrug() {
        getAllDrugs().then(res => {
            if (res.code === "200"){
                tableData.value = res.items;
            } else {
                ElMessage.error(res.msg);
            }
        })
    }

    let addFrom = ref({
        barCode: '',
        imgSrc: '',
        name: '',
        type: "",
        effect: '',
        count: '',
        size: '',
        price: '',
        expires: '',
    });
    let showAMB = ref(false);
    function addClick() {
        isEdit.value = false;
        addFrom.value = {
            barCode: '',
            imgSrc: '',
            name: '',
            type: "",
            effect: '',
            count: '',
            size: '',
            price: '',
            expires: '',
        };
        showAMB.value = true;
    }

    interface RuleForm {
        name: string
        type: string
        size: string
        price: string
        count: string
        effect: string
        imgSrc: string
        barCode: string
        expires: string
    }

    const rules = reactive<FormRules<RuleForm>>({
        name: [
            { required: true, message: '请输入药品名称', trigger: 'blur' },
        ],
        type: [
            { required: true, message: '请输入药品类型', trigger: 'blur' },
        ],
        size: [
            { required: true, message: '请输入药品规格', trigger: 'blur' },
        ],
        price: [
            { required: true, message: '请输入药品价格', trigger: 'blur' },
        ],
        count: [
            { required: true, message: '请输入药品数量', trigger: 'blur' },
        ],
        effect: [
            { required: true, message: '请输入药品效果', trigger: 'blur' },
        ],
        imgSrc: [
            { required: true, message: '请输入药品图片', trigger: 'blur' },
        ],
        barCode: [
            { required: true, message: '请输入药品条码', trigger: 'blur' },
        ],
        expires: [
            { required: true, message: '请输入药品有效期', trigger: 'blur' },
        ],
    })
    const ruleFormRef = ref<FormInstance>()
    function showAMBClose () {
        showAMB.value = false;
    }

    function addAMBOk () {
        addM(
            addFrom.value
        ).then(res => {
            if (res.code === "200"){
                ElMessage.success(res.msg);
                getAllDrug();
            } else {
                ElMessage.error(res.msg);
            }
        })
        showAMB.value = false;
    }

    function editClick () {
        editM(addFrom.value).then(res => {
            if (res.code === "200"){
                ElMessage.success(res.msg);
                getAllDrug();
            } else {
                ElMessage.error(res.msg);
            }
        })
        showAMB.value = false;
    }

    let isEdit = ref(false);
    function changeMed (index: number) {
        addFrom.value = JSON.parse(JSON.stringify(tableData.value[index]));
        isEdit.value = true;
        showAMB.value = true;
    }

    function deleteMed (index: number) {
        ElMessageBox.confirm(
            '下架后不可撤销,确定下架吗？',
            '提示：',
            {
                confirmButtonText: '下架',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            delM(
                tableData.value[index]
            ).then(res => {
                if (res.code === "200"){
                    ElMessage.success(res.msg);
                    getAllDrug();
                } else {
                    ElMessage.error(res.msg);
                }
            })
        }).catch(() => {
            console.log('已取消下架');
        });
    }
</script>

<style lang="less" scoped>
  .adminMedicine {
    height: calc(100vh - 110px);
    overflow: auto;
    .el-table {
      max-height: calc(100vh - 140px);
      overflow: auto;
      z-index: 0;
    }
    .addMBox {
      .add {
        .dialog-footer {
          text-align: right;
        }
      }
    }
  }
</style>
