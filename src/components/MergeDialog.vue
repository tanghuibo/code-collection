<template>
  <el-dialog class="dialog" title="差异单据" :visible.sync="visible">
    <div class="head">
      <el-button icon="el-icon-edit" type="success" @click="replaceAll">替换全部</el-button>
      <el-button icon="el-icon-delete" type="danger" @click="removeAll">忽略全部</el-button>
    </div>
    <el-table :data="mergeList">
      <el-table-column label="方法名称" prop="name" />
      <el-table-column width="260" label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="success" @click="() => replace(scope.row)">替换</el-button>
          <el-button icon="el-icon-delete" type="danger" @click="() => remove(scope.$index)">忽略</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import copy from "copy-to-clipboard";
import service from "@/js/service.js";
let { getData, saveData } = service;
export default {
  data() {
    return {
      mergeList: [],
      visible: false
    };
  },
  methods: {
    show(mergeList) {
      this.mergeList = mergeList;
      this.visible = true;
    },
    
    check() {
      if (this.mergeList.length == 0) {
        this.visible = false;
        this.$emit("over");
      }
    },
    replaceAll() {
      let list = [...this.mergeList];
      list.forEach(item => this.replace(item));
      this.check();
    },
    removeAll() {
      this.mergeList = [];
      this.check();
    },
    replace(data) {
      let { name } = data;
      let functionInfoList = getData();

      for (let i = 0; i < functionInfoList.length; i++) {
        if (functionInfoList[i].name == name) {
          functionInfoList[i] = data;
          break;
        }
      }

      saveData(functionInfoList);

      this.mergeList = this.mergeList.filter(item => item.name != name);
      this.check();
    },
    remove(index) {
      this.mergeList.splice(index, 1);
      this.check();
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