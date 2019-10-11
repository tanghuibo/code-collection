<template>
  <div v-if="show">
    <el-container style="height: 90vh;  overflow: hidden;">
      <el-main style="overflow: hidden; padding: 0;">
        <el-tag
          style="overflow: hidden; text-overflow: ellipsis;line-height: 40px; height: 40px; font-size: 30px; width: 100%; text-align: left;"
        >{{this.functionName}}</el-tag>
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-tag
                type="success"
                style="line-height: 40px; height: 40px; font-size: 30px; width: 100%; text-align: center;"
              >参数</el-tag>
              <codemirror
                class="code-mirror"
                v-model="from.params"
                :options="{
            tabSize: 4,
            mode: 'text/javascript',
            theme: 'eclipse',
            lineHeigh: 10,
            lineNumbers: true,
            lineWrapping: true,
            height: 800,
            line: true
          }"
              ></codemirror>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-tag
                type="success"
                style="line-height: 40px; height: 40px; font-size: 30px; width: 100%; text-align: center;"
              >方法</el-tag>
              <codemirror
                class="code-mirror"
                v-model="from.printFunction"
                :options="{
            tabSize: 4,
            mode: 'text/javascript',
            theme: 'eclipse',
            lineNumbers: true,
            lineWrapping: true,
            line: true
          }"
              ></codemirror>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-footer style="padding: 0;">
        <el-button style="width: 100%; margin-top: 10px;" type="primary" @click="comit">修改</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    functionName: "",
    from: {
      params: "",
      printFunction: ""
    }
  }),
  methods: {
    setEditData(editData, functionName) {
      if (editData == null || Object.keys(editData) == 0) {
        editData = {
          params: [],
          printFunction: `function($, pt) { 
  pt("hello", \`world\`);
}`
        };
      }
      this.show = true;
      this.from.params = JSON.stringify(editData.params, null, 2);
      this.from.printFunction = editData.printFunction;
      this.functionName = functionName;
    },
    close() {
      this.show = false;
    },
    comit() {
      try {
        let result = {};
        result.params = eval(`(() => (${this.from.params}))()`);
        this.from.params = JSON.stringify(result.params, 0, 2);
        if (!(result.params instanceof Array)) {
          this.$message.error("必须输入数组");
          return;
        }
        for (let param of result.params) {
          if (param.key == null || (param.key + "").trim() == "") {
            this.$message.error("参数列表每一项必须填key");
            return;
          }
          if (typeof param.key != "string") {
            this.$message.error("key类型必须为String");
            return;
          }
        }
        result.printFunction = this.from.printFunction;
        console.log(result);
        this.$emit("commit", result);
      } catch (e) {
        this.$message.error(`发生了错误，${e}`);
      }
    }
  }
};
</script>

<style>
.code-mirror {
  font-size: 18px;
  line-height: 20px;
  border: 1px solid #555;
  height: calc(90vh - 160px);
}
.code-mirror .CodeMirror.cm-s-eclipse.CodeMirror-wrap {
  height: calc(90vh - 160px);
}
.tag-class {
  line-height: 40px;
  height: 40px;
  font-size: 30px;
  width: 100%;
  text-align: center;
}
</style>