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
    <el-dropdown @click="upload" style="margin-top: 10px; " size="mini" split-button>
      导入
      <el-dropdown-menu size="mini" divided slot="dropdown">
        <el-dropdown-item size="mini">
          <div @click="allUpload">全量导入</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
    },
    allUpload() {
      this.$emit("allUpload", this.code, () => (this.visible = false));
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