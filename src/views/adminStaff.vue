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
                            @click.prevent="deleteRow(scope.$index)"
                    >
                        编辑
                    </el-button>
                    <el-button
                            link
                            type="primary"
                            size="small"
                            @click.prevent="deleteRow(scope.$index)"
                    >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button class="mt-4" style="width: 100%" @click="onAddItem"
        > + 新增员工</el-button
        >
    </div>
</template>

<script setup>
    import {ref} from "vue";

    let tableData = ref([{
        id: '123456789',
        name: '张三',
        duties: "销售",
        password: "123456",
    }]);
    let searchId = ref('');
</script>

<style lang="less" scoped>
  .adminStaff {
    height: calc(100vh - 100px);
    overflow: auto;
    .select {
      display: flex;
      // 居右
      justify-content: flex-end;
      margin-bottom: 20px;
      .el-button {
        margin-left: 10px;
      }
    }
  }
</style>
