<template>
  <div>
    <div class="head">
      <el-input style="width: 300px;" placeholder="请输入内容" v-model="keyWords">
        <template slot="prepend">查询</template>
      </el-input>
      <el-button type="primary" style="margin-left: 20px;" @click="addData" icon="el-icon-plus">新增</el-button>
    </div>
    <el-table border stripe :data="showList">
      <el-table-column type="expand">
        <template slot-scope="props">
          <EditFunctionView
            @commit="data => editParamCommit(props.$index, data)"
            :value="props.row.functionInfo"
          />
        </template>
      </el-table-column>
      <el-table-column label="方法名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column width="260" label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="success"
            @click="() => editData(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
            icon="el-icon-delete"
            type="danger"
            @click="() => deleteData(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog ref="editDialog" @addSubmit="addSubmit" @editSubmit="editSubmit" />
  </div>
</template>

<script>
import EditDialog from "@/components/EditDialog";
import EditFunctionView from "@/components/EditFunctionView";
export default {
  components: { EditFunctionView, EditDialog },
  computed: {
    showList() {
      let keyWords = this.keyWords;
      if (keyWords == null || keyWords.trim() == "") {
        return this.functionInfoList;
      }
      keyWords = keyWords.trim();

      return this.functionInfoList.filter(
        item =>
          item.name.indexOf(keyWords) >= 0 || item.desc.indexOf(keyWords) >= 0
      );
    }
  },
  data: function() {
    return {
      functionInfoList: [],
      keyWords: ""
    };
  },
  mounted() {
    let functionInfoList = localStorage.getItem("functionList");
    if (
      functionInfoList != null &&
      functionInfoList != "" &&
      functionInfoList != "undefined" &&
      functionInfoList != "null"
    ) {
      this.functionInfoList = JSON.parse(functionInfoList);
    }
  },
  methods: {
    showMessageAndSaveData(message) {
      this.$message({
        type: "success",
        message
      });
      this.saveData();
    },
    saveData() {
      localStorage.setItem(
        "functionList",
        JSON.stringify(this.functionInfoList)
      );
    },
    deleteData(index, data) {
      this.$confirm(
        `确认要删除方法"${data == null ? "" : data.name}"吗`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.functionInfoList.splice(index, 1);
          this.showMessageAndSaveData("删除成功");
        })
        .catch(() => {});
    },
    editSubmit(data, index) {
      this.functionInfoList[index] = data;
      this.showMessageAndSaveData("修改成功");
    },
    addSubmit(data) {
      this.functionInfoList.push(data);
      this.showMessageAndSaveData("新增成功");
    },
    editParamCommit(index, data) {
      this.$set(this.functionInfoList[index], "functionInfo", data);
      this.showMessageAndSaveData("修改成功");
    },

    addData() {
      this.$refs.editDialog.add(this.functionInfoList.map(item => item.name));
    },
    editData(index, data) {
      this.$refs.editDialog.edit(
        this.functionInfoList.map(item => item.name),
        data,
        index
      );
    }
  }
};
</script>

<style lang="css" scoped>
.head {
  margin-bottom: 10px;
}
</style>