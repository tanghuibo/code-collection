<template>
  <el-dialog class="dialog" title="导入" :visible.sync="visible">
    <codemirror
      class="codemirror"
      v-model="code"
      :options="{
            tabSize: 4,
            mode: 'text/javascript',
            theme: 'eclipse',
            lineNumbers: true,
            lineWrapping: true,
            line: true
          }"
    />
    <el-button @click="upload" type="text">导入</el-button>
  </el-dialog>
</template>

<script>
import copy from "copy-to-clipboard";
export default {
  data() {
    return {
      code: "",
      visible: false
    };
  },
  methods: {
    show() {
      this.code = "";
      this.visible = true;
    },
    upload() {
      this.$emit("upload", this.code, () => (this.visible = false));
    }
  }
};
</script>

<style scoped>
.codemirror {
  border: 1px solid #555;
}
.dialog {
  margin: 0;
  padding: 0;
}
.footer {
  background-color: red;
}
</style>