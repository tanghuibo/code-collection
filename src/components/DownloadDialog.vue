<template>
  <el-dialog class="dialog" title="导出" :visible.sync="visible">
    <codemirror
      class="codemirror"
      :value="code"
      :options="{
            readOnly: true,
            tabSize: 4,
            mode: 'text/javascript',
            theme: 'eclipse',
            lineNumbers: true,
            lineWrapping: true,
            line: true
          }"
    />
    <el-button @click="copy" type="text">复制</el-button>
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
    show(code) {
      this.code = code;
      this.visible = true;
    },
    copy() {
      copy(this.code);
      this.$message("复制成功");
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
    background-color: red
}
</style>