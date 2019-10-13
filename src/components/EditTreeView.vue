<template>
  <div>
    <div>
      <el-button-group style="width: calc(100% - 6px); margin: 3px; margin-bottom: 0;">
        <el-button
          v-if="editMode"
          @click="() => this.enableEnditModel(false)"
          icon="el-icon-caret-right"
          style="width: 33%;"
          size="mini"
        >运行</el-button>
        <el-button
          v-if="!editMode"
          @click="() => this.enableEnditModel(true)"
          icon="el-icon-edit"
          style="width: 33%;"
          size="mini"
        >编辑</el-button>
        <el-button icon="el-icon-upload2" style="width: 34%;" size="mini">导入</el-button>
        <el-button icon="el-icon-download" style="width: 33%;" size="mini">导出</el-button>
      </el-button-group>
    </div>
    <div style="padding: 5px;">
      <el-input placeholder="输入关键字进行过滤" size="mini" v-model="filterText" />
    </div>
    <el-tree
      style="margin: 5px;"
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
        <span
          @click="() => treeChange(data, node)"
          class="tree-label"
          :title="node.label"
        >{{ node.label }}</span>
        <span v-if="editMode">
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
    editMode: false,
    filterText: "",
    data: [
      {
        id: 1,
        label: "我的目录",
        children: [
          {
            id: 2,
            label: "常用工具",
            children: [
              {
                id: 3,
                label: "年级查询"
              },
              {
                id: 4,
                label: "成绩查询"
              }
            ]
          }
        ]
      }
    ]
  }),
  methods: {
    enableEnditModel(editMode) {
      this.editMode = editMode;
      this.$emit("changeMode", editMode);
    },
    updataData(node, data) {
      this.$set(node, "data", data);
      this.$message({
        type: "success",
        message: "编辑成功"
      });
    },
    treeChange(data, node) {
      if (node.level === 3) {
        this.$emit("clickNode", data, param => this.updataData(data, param));
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
          this.$emit("nodeRemove", data);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => null);
    }
  }
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.tree-label {
  width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 27px;
}
</style>