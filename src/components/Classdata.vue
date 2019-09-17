<template>
  <div>
    <br/><br/><br/>
    <div style="width: 90%; margin:0 auto">
      <el-button type="primary" class="btnright" @click="deviceAddbtn()">添加设备</el-button>
      <br/><br/>
      <el-table :data="classDatas" style="width: 100%;" row-key="id" border default-expand-all
      :tree-props="{children: 'child', hasChildren: 'hasChildren'}">
        <el-table-column prop="id" label="ID" ></el-table-column>
        <el-table-column prop="name" label="名称" sortable ></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'on'" type="success">启动</el-tag>
            <el-tag v-else type="danger">禁止</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="deviceEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="deviceDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" type="success" @click="deviceinfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'classdata',
  created () {
    this.getClassdatas()
  },
  data () {
    return {
      classDatas: []
    }
  },
  methods: {
    getClassdatas () {
      var _this = this
      var param = {}
      axios({
        method: 'get',
        url: 'api/get_area_list',
        params: param
      }).then(function (response) {
        console.log('=======教室=============' + JSON.stringify(response.data))
        _this.classDatas = response.data.data
      }).catch(function (error) {
        alert(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
