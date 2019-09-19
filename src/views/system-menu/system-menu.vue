<template>
  <div class="member">
    <el-card>
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="handleAddMember">
            添加
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="small" icon="view" @click="handleDeleteMember">
            删除
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="table_container">
      <el-table :data="tableData" border @select="select">
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column align="center" type="index" label="序号" width="170" :index="indexMethod">
        </el-table-column>
        <el-table-column align="center" prop="fullName" label="昵称" width="150">
        </el-table-column>
        <el-table-column align="center" prop="phoneNumber" label="手机号" width="150">
        </el-table-column>
        <el-table-column align="center" prop="sex" label="性别" width="170">
          <template slot-scope="scope">
            {{scope.row.sex==="0"?'男':'女'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="userName" label="用户名" width="180">
        </el-table-column>
        <el-table-column align="center" prop="workNum" label="职工工号" width="180">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="small" icon="edit" @click="handleUpdateMember(scope.$index,scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if='paginations.total > 0'
              background
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync='paginations.page_index'
              @current-change='handleCurrentChange'
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <Dalig ref="dalig" :formData="formData" :dialog="dialog" @update="update"></Dalig>
  </div>
</template>

<script>
  import axios from "../../common/js/http"
  import qs from "qs"
  import Dalig from "../../components/dalag/dalag"

  export default {
    name: "member",
    created() {
      this.getTableList()
    },
    data() {
      return {
        tableData: [],
        selectedRow: [],
        allTableData: [],
        pageIndex: 1,
        formData: {
          userName: "",
          fullName: "",
          workNum: "",
          phoneNumber: "",
          sex: "0",
          status: "0",
          userId: ""
        },
        dialog: {
          show: false,
          title: "添加用户信息",
          option: "add"
        },
        paginations: {
          page_index: 1,  /*当前位于那页*/
          total: 0, /*当前数据的总数*/
          page_size: 10, /*一页显示多少条*/
          page_sizes: [3, 6, 9, 12], /*每页显示多少条*/
          layout: "total,sizes,prev,pager,next,jumper", /*翻页属性*/
        },
      }
    },
    methods: {
      getTableList() {
        axios.post("/api/api/hr/person/list/v1", {searchValue: ""}).then(res => {
          if (res.status === 200) {
            this.tableData = res.data.rows
            this.allTableData = res.data.rows
            this.setPaginations()
          }
        }).catch()
      },
      update() {
        this.dialog.show = false;
        this.getTableList()
      },
      handleAddMember() {
        this.dialog = {
          show: true,
          title: "添加用户信息",
          option: "add"
        }
        this.formData = {
          userName: "",
          fullName: "",
          workNum: "",
          phoneNumber: "",
          sex: "0",
          status: "0",
          userId: ""
        }
      },
      select(selection, row) {
        this.selectedRow = []
        selection.forEach(item => {
          this.selectedRow.push(item["userId"])
        })
      },
      handleDeleteMember() {  /*批量删除用户信息*/
        axios({
          method: "post",
          url: "/api/api/hr/person/del/v1",
          data: {userIds: this.selectedRow.toString()}
        })
          .then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 1000
              })
              this.getTableList()
            }
          })
      },
      handleUpdateMember(index, row) {
        this.dialog = {
          show: true,
          title: "修改用户信息",
          option: "edit"
        }
        console.log(index)
        this.formData = {
          userName: row.userName,
          fullName: row.fullName,
          workNum: row.workNum,
          phoneNumber: row.phoneNumber,
          sex: row.sex,
          userId: row.userId
        }
      },
      handleCurrentChange(page) {
        /*获取当前页*/
        let index = this.paginations.page_size * (page - 1)
        console.log(index)
        this.pageIndex = index
        /*获取数据的总数*/
        let nums = this.paginations.page_size * page
        let tables = [];
        for (let i = index; i < nums; i++) {
          if (this.allTableData[i]) {
            tables.push(this.allTableData[i])
          }
          this.tableData = tables
        }
      },
      setPaginations() {
        this.paginations.total = this.allTableData.length;
        this.paginations.page_index = this.pageIndex;
        this.paginations.page_size = 3;
        /*设置默认的分页数据*/
        this.tableData = this.allTableData.filter((item, index) => {
          return index + this.paginations.page_size * (this.paginations.page_index - 1) <
            this.paginations.page_size * this.paginations.page_index
        })
      },
      indexMethod(index) {
        return (index + 1) + this.paginations.page_size * (this.paginations.page_index - 1)
      }
    },
    components: {
      Dalig
    }
  }
</script>

<style scoped lang="scss">
  .member {
    padding: 20px;

    .table_container {
      margin-top: 30px;

      .pagination {
        text-align: center;
        margin-top: 30px;
      }
    }

    .el-form-item {
      margin-bottom: 0 !important;
    }
  }
</style>
