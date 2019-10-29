<template>
  <div id="app">
    <el-container>
      <el-main class="main">
        <pane-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import PaneView from "@/pages/PaneView";
export default {
  name: "app",
  components: {
    PaneView
  },
  methods: {}
};
</script>

<style lang="css" scoped>
.main {
  
}
</style>
