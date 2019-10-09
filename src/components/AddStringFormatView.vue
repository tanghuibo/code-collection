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
      @current-change="treeChange"
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
            :disabled="node.level >= 3"
            @click="() => append(node, data)"
          >添加</el-button>
          <el-button type="text" size="mini" @click="() => edit(node, data)">改名</el-button>
          <el-button
            type="text"
            :disabled="node.level == 1"
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
const uuidv1 = require("uuid/v1");
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
    treeChange(data, node) {
      if (node.level === 3) {
        console.log(data);
      }
    },
    allowDrop(node1, node2, type) {
      return node1.level == node2.level;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    append(node, data) {
      const children = node.data.children;
      let nameList = children.map(item => item.label);
      this.$prompt("请输入节点名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: data => {
          if (data == null || data.trim() === "") {
            return "名称不可为空";
          }
          if (nameList.includes(data)) {
            return "名称已存在";
          }
        }
      })
        .then(({ value }) => {
          let newNode = {
            id: uuidv1(),
            label: value,
            children: node.level < 3 ? [] : null,
            functionData: node.level == 3 ? {} : null
          };
          console.log(newNode);
          data.children.push(newNode);
          this.$message({
            type: "success",
            message: "添加成功"
          });
        })
        .catch(() => null);
    },
    edit(node, data) {
      const parent = node.parent;
      const children = parent.data.children || [node.data];
      let nameList = children.map(item => item.label);
      let myName = data.label;
      this.$prompt("请输入新的节点名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: data => {
          if (data == null || data.trim() === "") {
            return "名称不可为空";
          }
          if (data === myName) {
            return "名称未做修改";
          }
          if (nameList.includes(data)) {
            return "名称已存在";
          }
        }
      })
        .then(({ value }) => {
          data.label = value;
          this.$message({
            type: "success",
            message: "修改成功"
          });
        })
        .catch(() => null);
    },
    remove(node, data) {
      this.$confirm(`确定要删除: ${data.label} 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const parent = node.parent;
          const children = parent.data.children;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => null);
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