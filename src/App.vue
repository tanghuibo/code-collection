<template>
  <div id="app">
    <div>
      <!-- <EditView v-if="param == null" @add="add" />
      <StringFromatView v-if="param" :value="param" />-->
      <el-tabs v-model="activitiTag" type="border-card">
        <el-tab-pane class="tab" label="使用" name="use">
          <use-pane-view v-if="activitiTag == 'use'" />
        </el-tab-pane>
        <el-tab-pane class="tab" label="编辑" name="edit">
           <edit-pane-view v-if="activitiTag == 'edit'" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import UsePaneView from "@/pages/UsePaneView";
import EditPaneView from "@/pages/EditPaneView";
export default {
  name: "app",
  components: {
    EditPaneView,
    UsePaneView
  },
  methods: {

  },
  data: () => ({
    keyWords: "",
    activitiTag: "use",
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

<style lang="css" scoped>
.head {
  margin-bottom: 10px;
}
.tab {
  height: calc(100vh - 100px);
  overflow: scroll;
}
</style>
