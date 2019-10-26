<template>
  <div>
    <el-container>
      <el-main style="overflow: hidden; padding: 0;">
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <el-tag type="success" class="el-tag">参数</el-tag>
              <codemirror
                class="code-mirror"
                v-model="form.params"
                :options="{
            tabSize: 4,
            mode: 'text/javascript',
            theme: 'eclipse',
            lineHeigh: 10,
            lineNumbers: true,
            lineWrapping: true,
            line: true
          }"
              ></codemirror>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-tag type="success" class="el-tag">方法</el-tag>
              <codemirror
                class="code-mirror"
                v-model="form.printFunction"
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
    </el-container>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        params: [],
        printFunction: `function($, pt) { 
  pt("hello", \`world\`);
}`
      })
    }
  },
  data: () => ({
    form: {
      params: "",
      printFunction: ""
    }
  }),
  mounted() {
    this.setEditData(this.value);
  },
  methods: {
    setEditData(editData) {
      this.form.params = JSON.stringify(editData.params, null, 2);
      this.form.printFunction =
        editData.printFunction == null ? "" : editData.printFunction;
    },
    close() {
      this.show = false;
    },
    getData() {
      try {
        let result = {};
        if (this.form.params == null || this.form.params.trim() == "") {
          this.form.params = "[]";
        }
        result.params = eval(`(() => (${this.form.params}))()`);
        this.form.params = JSON.stringify(result.params, 0, 2);
        if (!(result.params instanceof Array)) {
          this.$message.error("必须输入数组");
          return { success: false };
        }
        for (let param of result.params) {
          if (param.key == null || (param.key + "").trim() == "") {
            this.$message.error("参数列表每一项必须填key");
            return { success: false };
          }
          if (typeof param.key != "string") {
            this.$message.error("key类型必须为String");
            return { success: false };
          }
        }
        result.printFunction = this.form.printFunction;
        return { success: true, data: result };
      } catch (e) {
        this.$message.error(`发生了错误，${e}`);
        return { success: false };
      }
    }
  }
};
</script>

<style lang="css" scoped>
.code-mirror {
  font-size: 18px;
  line-height: 20px;
  border: 1px solid #555;
}
.el-tag {
  line-height: 40px;
  height: 40px;
  font-size: 30px;
  width: 100%;
  text-align: center;
}
</style>