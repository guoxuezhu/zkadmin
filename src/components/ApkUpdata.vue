<template>
  <div>
    <Navbar></Navbar>
    <div style="width: 90%; margin:0 auto">
      <br/><br/>
      <el-button type="primary" class="btnright" @click="apkupdatabtn()">上传安装包</el-button>
      <el-button type="primary" class="btnright" @click="getApkUpdata()">更新</el-button>
      <br/><br/>
      <el-table :data="apktableData" border style="width: 100%">
        <el-table-column prop="title" label="名称" ></el-table-column>
        <el-table-column prop="version_code" label=" 版本号"></el-table-column>
        <el-table-column prop="version_name" label="版本名称"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="软件信息" :visible.sync="apkdialogVisible">
      <el-form :model="form">
        <el-form-item label="版本号" :label-width="formLabelWidth">
          <el-input v-model="form.version_code" autocomplete="off" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="版本名称" :label-width="formLabelWidth">
          <el-input v-model="form.version_name" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="安装包名称" :label-width="formLabelWidth">
          <el-select v-model="form.name" placeholder="请选择安装包名称" style="width: 100%">
            <el-option label="主机" value="主机"></el-option>
            <el-option label="操作面板" value="操作面板"></el-option>
            <el-option label="设备操作" value="设备操作"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件地址" :label-width="formLabelWidth">
          <b-form-file v-model="form.file" placeholder="请选择文件" drop-placeholder="Drop file here..." ></b-form-file>
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
      fileList: []
    }
  },
  methods: {
    getApkList () {
      var _this = this
      var param = {}
      axios({
        method: 'get',
        url: 'api/get_soft_list',
        params: param
      }).then(function (response) {
        console.log('=======getApkList=============' + JSON.stringify(response.data))
        _this.apktableData = response.data.data.rows
      }).catch(function (error) {
        alert(error)
      })
    },
    getApkUpdata () {
      // var _this = this
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
      }).catch(function (error) {
        alert(error)
      })
    },
    apkupdatabtn () {
      this.apkdialogVisible = true
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>
.btnright {
  float: right;
}
</style>
