<template>
  <div id="app">
    <div>
      <el-tabs v-model="activitiTag" type="border-card">
        <el-tab-pane class="tab" label="使用" name="use">
          <span slot="label">
            <i class="el-icon-magic-stick"></i> 使用
          </span>
          <use-pane-view v-if="activitiTag == 'use'" />
        </el-tab-pane>
        <el-tab-pane class="tab" label="编辑" name="edit">
          <span slot="label">
            <i class="el-icon-edit"></i> 编辑
          </span>
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
  methods: {},
  data: () => ({
    keyWords: "",
    activitiTag: "use"
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
.tab::-webkit-scrollbar {
  display: none;
}
</style>
