<template>
  <div>
    <div class="head">
      <el-input style="width: 300px;" placeholder="请输入内容" v-model="keyWords">
        <template slot="prepend">查询</template>
      </el-input>
      <el-button type="primary" style="margin-left: 20px;" @click="addData" icon="el-icon-plus">新增</el-button>
      <el-button
        type="primary"
        style="margin-left: 20px;"
        @click="showUpload"
        icon="el-icon-upload2"
      >导入</el-button>
      <el-button
        type="primary"
        style="margin-left: 20px;"
        @click="showDownload"
        icon="el-icon-download"
      >导出</el-button>
    </div>
    <el-table border stripe :data="showList">
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
    <download-dialog ref="downloadDialog" />
    <upload-dialog ref="uploadDialog" @upload="upload" />
    <merge-dialog ref="mergeDialog" @over="mergeOver" />
  </div>
</template>

<script>
import EditDialog from "@/components/EditDialog";
import DownloadDialog from "@/components/DownloadDialog";
import UploadDialog from "@/components/UploadDialog";
import MergeDialog from "@/components/MergeDialog";
import service from "@/js/service.js";
let { getData, saveData } = service;
import langUtil from "@/js/langUtil.js";
let { likes } = langUtil;
export default {
  components: {
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
      keyWords: ""
    };
  },
  mounted() {
    this.functionInfoList = getData();
  },
  methods: {
    mergeOver() {
      this.functionInfoList = getData();
      this.$message.success("导入成功");
    },
    showUpload() {
      this.$refs.uploadDialog.show();
    },
    upload(code, close) {
      try {
        let list = JSON.parse(code);
        if (!(list instanceof Array)) {
          this.$$message.error("导入格式错误");
        }

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
              if (JSON.stringify(element2) != JSON.stringify(element)) {
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
      this.$refs.downloadDialog.show(
        JSON.stringify(this.functionInfoList, 0, 2)
      );
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