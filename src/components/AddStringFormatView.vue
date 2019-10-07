<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div>
          <el-tag size="medium" class="tag-class">参数</el-tag>
          <codemirror
            class="code-mirror"
            v-model="from.paramStr"
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
            v-model="from.func"
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

    <el-button style="width: 100%; margin-top: 10px;" type="primary" @click="add">添加</el-button>
  </div>
</template>

<script>
export default {
  data: () => ({
    from: {
      paramStr: `[
  {
    label: "名称",
    key: "name",
    default: null
  },
  {
    label: "数值",
    key: "value",
    default: null
  }
]`,
      func: `function($, pt) { 
  pt("问候语", \`\${$.name}, 你好\`);
  pt("猜测", \`结果: \${$.value}\`);
  pt("", "好像有问题？");
}`
    }
  }),
  methods: {
    add() {
      try {
        let result = {};
        result.paramList = eval(`(() => (${this.from.paramStr}))()`);
        result.getResultFunction = this.from.func;
        this.$emit("add", result);
      } catch (e) {
        this.$message.error(`发生了错误，${e}`);
      }
    }
  }
};
</script>

<style scoped>
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