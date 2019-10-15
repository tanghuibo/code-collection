<template>
  <div id="app">
    <div>
      <!-- <EditView v-if="param == null" @add="add" />
      <StringFromatView v-if="param" :value="param" />-->
      <el-tabs :value="'use'" type="border-card">
        <el-tab-pane class="tab" label="使用" name="use">
          <el-table border stripe :data="functionInfoList">
            <el-table-column type="expand">
              <template slot-scope="props">
                <StringFromatView :value="props.row.functionInfo" />
              </template>
            </el-table-column>
            <el-table-column label="方法名称" prop="name"></el-table-column>
            <el-table-column label="描述" prop="desc"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane class="tab" label="编辑" name="edit">
          <el-table border stripe :data="functionInfoList">
            <el-table-column type="expand">
              <template slot-scope="props">
                <EditFunctionView
                  @commit="data => editCommit(props.$index, data)"
                  :value="props.row.functionInfo"
                />
              </template>
            </el-table-column>
            <el-table-column label="方法名称" prop="name"></el-table-column>
            <el-table-column label="描述" prop="desc"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import StringFromatView from "@/components/StringFromatView";
import EditFunctionView from "@/components/EditFunctionView";
export default {
  name: "app",
  components: {
    StringFromatView,
    EditFunctionView
  },
  methods: {
    add(data) {
      this.param = data;
    },
    editCommit(index, data) {
      this.functionInfoList[index].functionInfo = data;
      this.$message.success("保存成功");
    }
  },
  data: () => ({
    functionInfoList: [
      {
        name: "第一次新增",
        desc: "我是空的",
        functionInfo: {
          params: [],
          printFunction: null
        }
      },
      {
        name: "已保存过方法",
        desc: "我有存货",
        functionInfo: {
          params: [{ key: "name", label: "报上名来" }],
          printFunction: `function($, pt) { 
  pt("亲切的问候", \`你好\${$.name}\`);
}`
        }
      }
    ]
  })
};
</script>

<style>
.tab {
  height: calc(100vh - 100px);
  overflow: scroll;
}
</style>
