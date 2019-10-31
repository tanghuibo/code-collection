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
    <el-dropdown @click="copy" style="margin-top: 10px; " size="mini" split-button>
      复制
      <el-dropdown-menu size="mini" divided slot="dropdown">
        <el-dropdown-item size="mini">
          <div @click="download">导出</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-dialog>
</template>

<script>
import exportText from "@/js/exportText.js";
import copy from "copy-to-clipboard";
import langUtil from "@/js/langUtil.js";
let { timeFormat } = langUtil;
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
    },
    download() {
      exportText(`string-format-${timeFormat(new Date(), "yyyy-mm-dd hh:MM:ss")}.json`, this.code);
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