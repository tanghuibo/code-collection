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
    <edit-dialog ref="editDialog" @afterSuccess="showMessageAndGetData" />
    <download-dialog ref="downloadDialog" />
    <upload-dialog
      ref="uploadDialog"
      @afterSuccess="showMessageAndGetData"
      @handleMerge="handleMerge"
    />
    <merge-dialog ref="mergeDialog" @afterSuccess="showMessageAndGetData" />
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
import { async } from "q";
let { getData, saveData, deleteByIds } = service;
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
        return this.codeList;
      }
      keyWords = keyWords.trim();

      return this.codeList.filter(item =>
        likes([item.name, item.desc], keyWords)
      );
    }
  },
  data: function() {
    return {
      codeList: [],
      keyWords: "",
      inEditMode: false,
      selectList: []
    };
  },
  mounted() {
    getData().then(data => (this.codeList = data));
  },
  methods: {
    getHeaderClassName({ columnIndex }) {
      if (columnIndex == 0) {
        return this.inEditMode ? null : "hidden-heard-checkbox";
      }
      return null;
    },
    showUpload() {
      this.$refs.uploadDialog.show();
    },
    showDownload() {
      if (this.selectList.length == 0) {
        this.$refs.downloadDialog.show(JSON.stringify(this.codeList, 0, 2));
      } else {
        this.$refs.downloadDialog.show(JSON.stringify(this.selectList, 0, 2));
      }
    },
    showMessageAndGetData(message) {
      this.$message.success(message);
      getData().then(data => (this.codeList = data));
    },
    deleteList() {
      this.$confirm(`确认要删除${this.selectList.length}条数据吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await deleteByIds(this.selectList.map(item => item.id));
          this.showMessageAndGetData("删除成功");
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
        .then(async () => {
          await deleteByIds([data.id]);
          this.showMessageAndGetData("删除成功");
        })
        .catch(e => {
          if (typeof e === "string") {
            this.$message.error(e);
          } else {
            console.error(e);
            this.$message.error("删除失败");
          }
        });
    },

    addData() {
      this.$refs.editDialog.add();
    },
    editData(index, data) {
      this.$refs.editDialog.edit(data);
    },
    handleSelectionChange(selectList) {
      this.selectList = selectList;
    },
    handleMerge(list) {
      this.$refs.mergeDialog.show(list);
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