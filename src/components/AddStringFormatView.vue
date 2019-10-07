<template>
  <div>
    <el-form :model="from" class="demo-form-inline">
      <el-form-item label="参数">
        <el-input type="textarea" v-model="from.paramStr"></el-input>
      </el-form-item>
      <el-form-item label="方法">
        <el-input type="textarea" v-model="from.func"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>
    </el-form>
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
          pt("", "好像有问题？");}`
    }
  }),
  methods: {
    add() {
      try {
        let result = {};
        result.paramList = eval(`(() => (${this.from.paramStr}))()`);
        result.getResultFunction = this.from.func;
        console.log(JSON.stringify(result));
        this.$emit("add", result);
      } catch (e) {
        console.error(e);
        this.$message.error(`发生了错误，${e}`);
      }
    }
  }
};
</script>