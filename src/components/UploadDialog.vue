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
    <el-dropdown
      :loading="loading"
      @click="upload"
      style="margin-top: 10px; "
      size="mini"
      split-button
    >
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
import serive from "../js/service";

let { uploadAll, upload } = serive;
export default {
  data() {
    return {
      loading: false,
      code: "",
      visible: false
    };
  },
  methods: {
    show() {
      this.code = "";
      this.visible = true;
    },
    getUploadData() {
      let list = null;
      try {
        list = JSON.parse(this.code);
        if (!(list instanceof Array)) {
          throw "格式必须为JSON数组";
        }
      } catch (e) {
        console.log(e);
        throw "格式必须为JSON数组";
      }
      let nameSet = new Set();
      for (let data of list) {
        let {
          name,
          functionInfo: { params, printFunction }
        } = data;

        if (name == null || name.trim() == "") {
          throw "name不能为空";
        }
        nameSet.add(name);
        if (params != null && !(params instanceof Array)) {
          throw "params必须为数组";
        }
        if (printFunction == null || printFunction.trim() == "") {
          throw "printFunction不能为空";
        }
      }
      if (nameSet.size != list.length) {
        throw "name存在重复";
      }
      return list;
    },
    async upload() {
      try {
        this.loading = false;
        let uploadList = this.getUploadData();
        let resultList = await upload(uploadList);
        if (resultList.length == 0) {
          this.$emit("afterSuccess", "导入成功");
        } else {
          this.$emit("handleMerge", resultList);
        }
        this.visible = false;
      } catch (e) {
        if (typeof e === "string") {
          this.$message.error(e);
        } else {
          console.error(e);
          this.$message.error("发生未知错误");
        }
      } finally {
        this.loading = true;
      }
    },
    async allUpload() {
      try {
        this.loading = false;
        let uploadList = this.getUploadData();
        await uploadAll(uploadList);
        this.$emit("afterSuccess", "导入成功");
        this.visible = false;
      } catch (e) {
        if (typeof e === "string") {
          this.$message.error(e);
        } else {
          console.error(e);
          this.$message.error("发生未知错误");
        }
      } finally {
        this.loading = true;
      }
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