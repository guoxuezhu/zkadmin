<template>
  <div>
    <Navbar></Navbar>
    <div style="width: 90%; margin:0 auto">
      <!-- <el-button type="primary" class="btnright" @click="deviceAddbtn()">添加设备</el-button> -->
      <br/><br/>
      <el-input v-model="searchName" placeholder="请输入设备名称" style="width: 200px" ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchbtn()">搜索</el-button>
      <br/><br/>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="title" label="设备名称" ></el-table-column>
        <el-table-column prop="ip" label="IP地址" width="180"></el-table-column>
        <el-table-column prop="version" label="系统版本"></el-table-column>
        <el-table-column prop="data_version" label="数据库版本"></el-table-column>
        <el-table-column prop="video_num" label="显示屏个数" ></el-table-column>
        <el-table-column label="远程控制">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.show === 1" type="success">启动</el-tag>
            <el-tag v-else type="danger">禁止</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="deviceEdit(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在尝试连接设备中" element-loading-background="rgba(0, 0, 0, 0.2)">连接修改</el-button>
            <!-- <el-button size="mini" type="danger" @click="deviceDelete(scope.$index, scope.row)">删除</el-button> -->
            <el-button size="mini" type="success" @click="deviceinfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br/><br/>
      <b-pagination v-model="currentPage" :total-rows="count" :per-page="perPage" align="center" @change="pageEvent()"></b-pagination>
    </div>
    <el-dialog title="添加设备信息" :visible.sync="adddialogVisible">
      <el-form :model="form">
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="form.devicename" autocomplete="off" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" :label-width="formLabelWidth">
          <el-input v-model="form.ip" autocomplete="off" placeholder="请输入设备IP地址"></el-input>
        </el-form-item>
        <el-form-item label="系统版本" :label-width="formLabelWidth">
          <el-input v-model="form.deviceversion" autocomplete="off" placeholder="请输入系统版本"></el-input>
        </el-form-item>
        <el-form-item label="数据库版本" :label-width="formLabelWidth">
          <el-input v-model="form.dataversion" autocomplete="off" placeholder="请输入数据库版本"></el-input>
        </el-form-item>
        <el-form-item label="显示屏个数" :label-width="formLabelWidth">
          <el-input v-model="form.videonum" autocomplete="off" type="number" min="0"  placeholder="请输入显示屏个数"></el-input>
        </el-form-item>
        <el-form-item label="远程控制" :label-width="formLabelWidth">
          <el-select v-model="form.mqttstatus" placeholder="请选择是否远程控制" style="width: 100%">
            <el-option label="启动" value="on"></el-option>
            <el-option label="禁止" value="off"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDeviceok()">确 定</el-button>
      </div>
    </el-dialog>
    <br/><br/><br/>
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
    this.getDevices()
  },
  data () {
    return {
      fullscreenLoading: false,
      searchName: '',
      tableData: [],
      adddialogVisible: false,
      form: {
        devicename: '',
        ip: '',
        deviceversion: '',
        dataversion: '',
        videonum: '0',
        mqttstatus: 'off'
      },
      perPage: 10,
      currentPage: 1,
      count: 1,
      formLabelWidth: '120px'
    }
  },
  methods: {
    deviceAddbtn () {
      this.form.ip = '192.168.1.1'
      this.form.devicename = ''
      this.form.deviceversion = '1.0.1'
      this.form.dataversion = '1'
      this.form.videonum = '0'
      this.form.mqttstatus = 'off'
      this.adddialogVisible = true
    },
    deviceinfo (index, row) {
      console.log('===deviceinfo===' + index + '=====' + JSON.stringify(row))
      localStorage.setItem('zhongkongIP', row.ip)
      localStorage.setItem('isMyIPconnect', '0')
      this.$router.push({path: '/mainView'})
    },
    deviceEdit (index, row) {
      var _this = this
      _this.fullscreenLoading = true
      var param = {}
      axios({
        method: 'get',
        url: 'http://' + row.ip + ':8099/api/ipconnect',
        params: param
      }).then(function (response) {
        console.log('=======连接=============' + JSON.stringify(response.data))
        if (response.data === 200) {
          localStorage.setItem('isMyIPconnect', '1')
          localStorage.setItem('zhongkongIP', row.ip)
          _this.$router.push({path: '/mainView'})
        }
        _this.fullscreenLoading = false
      }).catch(function (error) {
        alert(error + '连接失败，请检查网络')
        _this.fullscreenLoading = false
      })
    },
    deviceDelete (index, row) {
      console.log('===deviceDelete===' + index + '=====' + JSON.stringify(row))
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    searchbtn () {
      this.getDevices()
    },
    pageEvent () {
      this.$nextTick(function () {
        console.log('=======currentPage========' + this.currentPage)
        this.getDevices()
      })
    },
    getDevices () {
      var _this = this
      var param = {
        title: _this.searchName,
        rows: _this.perPage,
        p: _this.currentPage
      }
      axios({
        method: 'get',
        url: 'api/get_center_list',
        params: param
      }).then(function (response) {
        console.log('=======getDevices=============' + JSON.stringify(response.data))
        _this.tableData = response.data.data.rows
        _this.count = response.data.data.count
      }).catch(function (error) {
        alert(error)
      })
    },
    addDeviceok () {
      var _this = this
      var param = {
        cate_id: 10015,
        ip: _this.form.ip,
        title: _this.form.devicename,
        version: _this.form.deviceversion,
        data_version: _this.form.dataversion,
        video_num: _this.form.videonum,
        show: _this.form.mqttstatus
      }
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'post',
        url: 'api/add_center_set',
        data: param,
        transformRequest: [function (data, headers) {
          return Qs.stringify(data)
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        console.log('=======添加=============' + JSON.stringify(response.data))
        if (response.data.msg === 'OK') {
          _this.adddialogVisible = false
          // alert('添加成功')
          _this.getDevices()
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
.titleAppbar {
  width: 100%;
  position: fixed;
  z-index: 1024;
}
.titleheight {
  height: 56px;
}
.btnright {
  float: right;
}
</style>
