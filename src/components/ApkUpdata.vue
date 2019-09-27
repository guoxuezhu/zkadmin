<template>
  <div>
    <Navbar></Navbar>
    <div style="width: 90%; margin:0 auto">
      <br/><br/>
      <el-button type="primary" class="btnright" @click="apkupdatabtn()">上传安装包</el-button>
      <!-- <el-button type="primary" class="btnright" @click="getApkUpdata()">更新</el-button> -->
      <br/><br/>
      <el-table :data="apktableData" border style="width: 100%">
        <el-table-column prop="title" label="名称"></el-table-column>
        <el-table-column prop="version_code" label=" 版本号"></el-table-column>
        <el-table-column prop="version_name" label="版本名称"></el-table-column>
        <el-table-column label="下载地址" width="550">
          <template slot-scope="scope">
            <b-link >{{scope.row.files}}</b-link>
          </template>
        </el-table-column>
      </el-table>
      <br/><br/>
      <b-pagination v-model="currentPage" :total-rows="count" :per-page="perPage" align="center" @change="pageEvent()"></b-pagination>
    </div>
    <el-dialog title="软件信息" :visible.sync="apkdialogVisible">
      <el-form :model="form">
        <el-form-item label="安装包名称" :label-width="formLabelWidth">
          <el-select v-model="form.name" placeholder="请选择安装包名称" style="width: 100%">
            <el-option label="主机" value="主机"></el-option>
            <el-option label="操作面板" value="操作面板"></el-option>
            <el-option label="设备操作" value="设备操作"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.version_code" autocomplete="off" placeholder="请输入版本号"></el-input>
        </el-form-item>
        <el-form-item label="版本名称" :label-width="formLabelWidth">
          <el-input v-model="form.version_name" autocomplete="off" placeholder="请输入版本名称"></el-input>
        </el-form-item>
        <el-form-item label="文件地址" :label-width="formLabelWidth">
          <b-form-file v-model="form.file" placeholder="请选择 .apk 文件" drop-placeholder="Drop file here..." ></b-form-file>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="apkdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addApkdataOK()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import axios from 'axios'
export default {
  components: {
    Navbar
  },
  created () {
    this.getApkList()
  },
  data () {
    return {
      apktableData: [],
      apkdialogVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        version_code: '',
        version_name: '',
        file: ''
      },
      perPage: 10,
      currentPage: 1,
      count: 1
    }
  },
  methods: {
    pageEvent () {
      this.$nextTick(function () {
        console.log('=======currentPage========' + this.currentPage)
        this.getApkList()
      })
    },
    getApkList () {
      var _this = this
      var param = {
        rows: _this.perPage,
        p: _this.currentPage
      }
      axios({
        method: 'get',
        url: 'api/get_soft_list',
        params: param
      }).then(function (response) {
        console.log('=======getApkList=============' + JSON.stringify(response.data))
        _this.apktableData = response.data.data.rows
        _this.count = response.data.data.count
      }).catch(function (error) {
        alert(error)
      })
    },
    getApkUpdata () {
      var param = {
        title: '主机',
        version_code: 1,
        version_name: '1.0.1'
      }
      axios({
        method: 'get',
        url: 'api/get_soft_info',
        params: param
      }).then(function (response) {
        console.log('=======getApkUpdata=============' + JSON.stringify(response.data))
      }).catch(function (error) {
        alert(error)
      })
    },
    addApkdataOK () {
      console.log('=======addApkdataOK=============' + this.form.file.name)
      var _this = this
      let formData = new FormData()
      formData.append('title', this.form.name)
      formData.append('version_code', this.form.version_code)
      formData.append('version_name', this.form.version_name)
      formData.append('files', this.form.file)
      axios({
        method: 'post',
        url: 'api/edit_soft',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(function (response) {
        console.log('=======addApkdataOK====上传=========' + JSON.stringify(response.data))
        if (response.data.msg === 'OK') {
          _this.apkdialogVisible = false
          // alert('添加成功')
          _this.getApkList()
        } else {
          alert('上传失败' + response.data.msg)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    apkupdatabtn () {
      this.form.name = ''
      this.form.version_code = 0
      this.form.version_name = ''
      this.form.file = ''
      this.apkdialogVisible = true
    }
  }
}
</script>

<style scoped>
.btnright {
  float: right;
}
</style>
