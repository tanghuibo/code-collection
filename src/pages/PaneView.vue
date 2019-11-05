<template>
  <div>
    <div class="panel-head">
      <el-input
        class="head-search-input"
        placeholder="请输入搜索内容"
        prefix-icon="el-icon-search"
        v-model="keyWords"
      ></el-input>
      <transition name="el-fade-in-linear">
        <span v-show="inEditMode">
          <el-button
            type="primary"
            style="margin-left: 20px;"
            @click="addData"
            icon="el-icon-plus"
          >新增</el-button>
          <el-badge :value="selectList.length" :hidden="selectList.length == 0" class="item">
            <el-button
              :disabled="selectList.length == 0"
              type="primary"
              style="margin-left: 20px;"
              @click="deleteList"
              icon="el-icon-delete"
            >删除</el-button>
          </el-badge>
          <el-button
            type="primary"
            style="margin-left: 20px;"
            @click="showUpload"
            icon="el-icon-upload2"
          >导入</el-button>
          <el-badge :value="selectList.length" :hidden="selectList.length == 0" class="item">
            <el-button
              type="primary"
              style="margin-left: 20px;"
              @click="showDownload"
              icon="el-icon-download"
            >导出</el-button>
          </el-badge>
        </span>
      </transition>
      <el-switch v-model="inEditMode" class="head-mode-switch" active-text="开启编辑"></el-switch>
    </div>
    <el-table
      :header-cell-class-name="getHeaderClassName"
      class="panel-table"
      stripe
      :data="showList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55">
        <div v-if="!inEditMode">
          <template></template>
        </div>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="方法名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column width="260" label>
        <template slot-scope="scope">
          <el-button icon="el-icon-caret-right" circle type="primary" @click="() => run(scope.row)"></el-button>
          <transition name="el-fade-in-linear">
            <el-button
              v-if="inEditMode"
              icon="el-icon-edit"
              type="success"
              @click="() => editData(scope.$index, scope.row)"
              circle
            ></el-button>
          </transition>
          <transition name="el-fade-in-linear">
            <el-button
              v-if="inEditMode"
              icon="el-icon-delete"
              type="danger"
              circle
              @click="() => deleteData(scope.row)"
            ></el-button>
          </transition>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog ref="editDialog" @addSubmit="addSubmit" @editSubmit="editSubmit" />
    <download-dialog ref="downloadDialog" />
    <upload-dialog ref="uploadDialog" @upload="upload" @allUpload="allUpload" />
    <merge-dialog ref="mergeDialog" @over="mergeOver" />
    <StringFromatViewDialog ref="runDialog" />
  </div>
</template>

<script>
import StringFromatViewDialog from "@/components/StringFromatViewDialog";
import EditDialog from "@/components/EditDialog";
import DownloadDialog from "@/components/DownloadDialog";
import UploadDialog from "@/components/UploadDialog";
import MergeDialog from "@/components/MergeDialog";
import service from "@/js/service.js";
import langUtil from "@/js/langUtil.js";
import uuid from "uuid";
let { getData, saveData } = service;
let { likes, someEquals } = langUtil;
export default {
  components: {
    StringFromatViewDialog,
    EditDialog,
    DownloadDialog,
    UploadDialog,
    MergeDialog
  },
  computed: {
    showList() {
      let keyWords = this.keyWords;
      if (keyWords == null || keyWords.trim() == "") {
        return this.functionInfoList;
      }
      keyWords = keyWords.trim();

      return this.functionInfoList.filter(item =>
        likes([item.name, item.desc], keyWords)
      );
    }
  },
  data: function() {
    return {
      functionInfoList: [],
      keyWords: "",
      inEditMode: false,
      selectList: []
    };
  },
  mounted() {
    this.functionInfoList = getData();
  },
  methods: {
    getHeaderClassName({ columnIndex }) {
      if (columnIndex == 0) {
        return this.inEditMode ? null : "hidden-heard-checkbox";
      }
      return null;
    },
    mergeOver() {
      this.functionInfoList = getData();
      this.$message.success("导入成功");
    },
    showUpload() {
      this.$refs.uploadDialog.show();
    },
    allUpload(code, close) {
      try {
        let list = JSON.parse(code);
        if (!(list instanceof Array)) {
          this.$$message.error("导入格式错误");
        }
        list = list.map(item => ({ ...item, id: uuid() }));
        this.functionInfoList = list;
        this.saveData();
        close();
        this.$message.success("导入成功");
      } catch (e) {
        console.error(e);
        this.$message.error("导入格式错误");
      }
    },
    upload(code, close) {
      try {
        let list = JSON.parse(code);
        if (!(list instanceof Array)) {
          this.$$message.error("导入格式错误");
        }

        list = list.map(item => ({ ...item, id: uuid() }));
        let mergeList = [];
        let nameMap = {};
        let nameList = this.functionInfoList.map(item => {
          nameMap[item.name] = item;
          return item.name;
        });

        list.forEach(element => {
          let { name } = element;
          if (name != null) {
            if (nameList.includes(name)) {
              let element2 = nameMap[name];
              if (!someEquals(element, element2, ["desc", "functionInfo"])) {
                mergeList.push(element);
              }
            } else {
              nameMap[name] = element;
              nameList.push(name);
              this.functionInfoList.push(element);
            }
          }
        });
        this.saveData();
        close();

        if (mergeList.length > 0) {
          this.$refs.mergeDialog.show(mergeList);
        } else {
          this.$message.success("导入成功");
        }
      } catch (e) {
        console.error(e);
        this.$message.error("导入格式错误");
      }
    },
    showDownload() {
      if (this.selectList.length == 0) {
        this.$refs.downloadDialog.show(
          JSON.stringify(this.functionInfoList, 0, 2)
        );
      } else {
        this.$refs.downloadDialog.show(JSON.stringify(this.selectList, 0, 2));
      }
    },
    showMessageAndSaveData(message) {
      this.$message({
        type: "success",
        message
      });
      this.saveData();
    },
    saveData() {
      saveData(this.functionInfoList);
    },
    deleteList() {
      this.$confirm(`确认要删除${this.selectList.length}条数据吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.functionInfoList = this.functionInfoList.filter(
            item => !this.selectList.includes(item)
          );
          this.saveData();
          this.showMessageAndSaveData("删除成功");
        })
        .catch(() => {});
    },
    deleteData(data) {
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
          this.functionInfoList.splice(
            this.getFunctionInfoIndexById(data.id),
            1
          );
          this.saveData();
          this.showMessageAndSaveData("删除成功");
        })
        .catch(() => {});
    },
    getFunctionInfoIndexById(id) {
      for (let index in this.functionInfoList) {
        if (this.functionInfoList[index].id === id) {
          return index;
        }
      }
      return null;
    },
    editSubmit(data) {
      let { id } = data;
      let index = this.getFunctionInfoIndexById(id);
      for (let key in data) {
        this.$set(this.functionInfoList[index], key, data[key]);
      }
      this.showMessageAndSaveData("修改成功");
    },
    addSubmit(data) {
      this.functionInfoList.push(data);
      this.showMessageAndSaveData("新增成功");
    },

    addData() {
      this.$refs.editDialog.add(this.functionInfoList.map(item => item.name));
    },
    editData(index, data) {
      this.$refs.editDialog.edit(
        this.functionInfoList.map(item => item.name),
        data
      );
    },
    handleSelectionChange(selectList) {
      this.selectList = selectList;
    },
    run(data) {
      this.$refs.runDialog.show(data);
    }
  }
};
</script>

<style lang="css" scoped>
.panel-head {
  height: 50px;
  margin-bottom: 3px;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
}
.head-search-input {
  width: 35vh;
  line-height: 50px;
}
.head-mode-switch {
  float: right;
  height: 50px;
}
.panel-table {
  padding: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  max-height: calc(100vh - 140px);
  overflow-y: scroll;
}
</style>

<style>
.hidden-heard-checkbox > .cell > .el-checkbox {
  visibility: hidden;
}
</style>