<template>
  <div>
    <Navbar></Navbar>
    <br/><br/>
    <div style="width: 90%; margin:0 auto">
      <el-button type="primary" class="btnright" @click="addUserdata()">添加用户</el-button>
      <el-input v-model="searchName" placeholder="请输入用户名" style="width: 200px" ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchbtn()">搜索</el-button>
      <br/><br/>
      <el-table :data="usertableData" border style="width: 100%">
        <el-table-column prop="name" label="地址" ></el-table-column>
        <el-table-column prop="user_name" label="用户名"></el-table-column>
        <el-table-column prop="user_pass" label="密码"></el-table-column>
        <el-table-column label="权限">
          <template slot-scope="scope">
            <p v-if="scope.row.role === '1'">教师</p>
            <p v-else-if="scope.row.role === '9'">管理员</p>
            <p v-else >学生</p>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'on'" type="success">启动</el-tag>
            <el-tag v-else type="danger">锁定</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="UserEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="UserDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br/><br/>
      <b-pagination v-model="currentPage" :total-rows="count" :per-page="perPage" align="center" @change="pageEvent()"></b-pagination>
    </div>
    <el-dialog title="用户信息" :visible.sync="addUserDialogVisible">
      <el-form :model="form">
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.user_name" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.user_pass" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请选择权限" style="width: 100%">
            <el-option label="教师" value="1"></el-option>
            <el-option label="学生" value="2"></el-option>
            <el-option label="管理员" value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择状态" style="width: 100%">
            <el-option label="启动" value="on"></el-option>
            <el-option label="锁定" value="off"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserdataOK()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import axios from 'axios'
import Qs from 'qs'
export default {
  components: {
    Navbar
  },
  created () {
    console.log('============user=======created===')
    this.getUserdata()
  },
  data () {
    return {
      searchName: '',
      itemId: '',
      usertableData: [],
      addUserDialogVisible: false,
      form: {
        name: '',
        user_name: '',
        user_pass: '',
        role: '1',
        status: 'on'
      },
      perPage: 10,
      currentPage: 1,
      count: 1,
      formLabelWidth: '120px'
    }
  },
  methods: {
    pageEvent () {
      this.$nextTick(function () {
        console.log('=======currentPage========' + this.currentPage)
        this.getUserdata()
      })
    },
    searchbtn () {
      this.getUserdata()
    },
    getUserdata () {
      var _this = this
      var param = {
        name: _this.searchName,
        rows: _this.perPage,
        p: _this.currentPage
      }
      axios({
        method: 'get',
        url: 'api/get_user_list',
        params: param
      }).then(function (response) {
        console.log('=======getUserdata=============' + JSON.stringify(response.data))
        _this.usertableData = response.data.data.rows
        _this.count = response.data.data.count
      }).catch(function (error) {
        alert(error)
      })
    },
    UserEdit (index, row) {
      console.log('===UserEdit===' + index + '=====' + JSON.stringify(row))
      this.itemId = row.id
      this.form.name = row.name
      this.form.user_name = row.user_name
      this.form.user_pass = row.user_pass
      this.form.role = row.role
      this.form.status = row.status
      this.addUserDialogVisible = true
    },
    UserDelete (index, row) {
      var _this = this
      var param = {
        id: row.id
      }
      axios({
        method: 'post',
        url: 'api/del_user',
        data: param,
        transformRequest: [function (data, headers) {
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======UserDelete=============' + JSON.stringify(response.data))
        if (response.data.flag === 1) {
          _this.getUserdata()
        } else {
          alert('删除失败' + response.data.msg)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    addUserdata () {
      this.itemId = ''
      this.form.name = ''
      this.form.user_name = ''
      this.form.user_pass = ''
      this.form.role = '1'
      this.form.status = 'on'
      this.addUserDialogVisible = true
    },
    addUserdataOK () {
      var _this = this
      var param = {}
      if (_this.itemId === '') {
        param = {
          name: _this.form.name,
          status: _this.form.status,
          role: _this.form.role,
          user_name: _this.form.user_name,
          user_pass: _this.form.user_pass
        }
      } else {
        param = {
          id: _this.itemId,
          name: _this.form.name,
          status: _this.form.status,
          role: _this.form.role,
          user_name: _this.form.user_name,
          user_pass: _this.form.user_pass
        }
      }
      axios({
        method: 'post',
        url: 'api/edit_user',
        data: param,
        transformRequest: [function (data, headers) {
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======addUserdataOK=============' + JSON.stringify(response.data))
        if (response.data.msg === 'OK') {
          _this.addUserDialogVisible = false
          // alert('添加成功')
          _this.getUserdata()
        } else {
          alert('添加失败' + response.data.msg)
        }
      }).catch(function (error) {
        alert(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnright {
  float: right;
}
</style>
