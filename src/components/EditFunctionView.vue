<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div>
          <el-tag size="medium" class="tag-class">参数</el-tag>
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
            line: true
          }"
          ></codemirror>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-tag class="tag-class">方法</el-tag>
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

    <el-button style="width: 100%; margin-top: 10px;" type="primary" @click="comit">修改</el-button>
  </div>
</template>

<script>
export default {
  props: {
    editData: {
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
    from: {
      params: "",
      printFunction: ""
    }
  }),
  mounted() {
    this.from.params = JSON.stringify(this.editData.params, null, 2);
    this.from.printFunction = this.editData.printFunction;
  },
  methods: {
    comit() {
      try {
        let result = {};
        result.params = eval(`(() => (${this.from.params}))()`);
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
}
.tag-class {
  line-height: 40px;
  height: 40px;
  font-size: 30px;
  width: 100%;
  text-align: center;
}
</style>