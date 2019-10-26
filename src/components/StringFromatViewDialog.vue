<template>
  <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="visible" fullscreen>
    <StringFromatView :value="data" v-if="visible" />
  </el-dialog>
</template>

<script>
import Vue from "vue";
import StringFromatView from "./StringFromatView";
export default {
  name: "StringFromatViewDialog",
  components: {
    StringFromatView
  },
  data: () => {
    return {
      visible: false,
      title: ""
    };
  },
  methods: {
    show(data) {
      this.data = data.functionInfo;
      this.title = data.name;
      this.visible = true;
    }
  }
};
</script>

<style>
</style>