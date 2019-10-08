<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      style="width: 30%;"
      :data="data"
      ref="tree"
      node-key="id"
      default-expand-all
      draggable
      :filter-node-method="filterNode"
      :allow-drop="allowDrop"
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            :disabled="!!data.functionInfo || !data.children"
            @click="() => append(data)"
          >添加</el-button>
          <el-button
            type="text"
            :disabled="!!data.children"
            size="mini"
            @click="() => remove(node, data)"
          >修改</el-button>
          <el-button
            type="text"
            :disabled="!!data.children"
            size="mini"
            @click="() => remove(node, data)"
          >删除</el-button>
        </span>
      </span>
    </el-tree>
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
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data: () => ({
    filterText: "",
    data: [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1"
          },
          {
            id: 6,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1"
          },
          {
            id: 8,
            label: "二级 3-2"
          }
        ]
      }
    ],
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
    allowDrop(node1, node2, type) {
     return type == 'inner';
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    append(data) {
      console.log(!data.children);
      return 1;
    },
    remove(data) {
      console.log(data);
      return 1;
    },
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>