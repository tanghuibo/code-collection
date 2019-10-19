<template>
  <div>
    <div class="head">
      <el-input style="width: 300px;" placeholder="请输入内容" v-model="keyWords">
        <template slot="prepend">查询</template>
      </el-input>
      <el-button type="primary" style="margin-left: 20px;" @click="showAddModel">新增</el-button>
    </div>
    <el-table border stripe :data="showList">
      <el-table-column type="expand">
        <template slot-scope="props">
          <EditFunctionView
            @commit="data => editCommit(props.$index, data)"
            :value="props.row.functionInfo"
          />
        </template>
      </el-table-column>
      <el-table-column label="方法名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="primary">修改</el-button>
          <el-button icon="el-icon-delete" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :close-on-click-modal="false"
      title="新增"
      :visible.sync="showAddDiagLogFlag"
      width="30%"
    >
      <el-form :model="addForm" :rules="addFormRules" label-position="right" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="addForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addFunctionInfo">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import EditFunctionView from "@/components/EditFunctionView";
export default {
  components: { EditFunctionView },
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
  watch: {
    functionInfoList: {
      handler: function(val, oldval) {
        this.saveData();
      },
      deep: true //对象内部的属性监听，也叫深度监听
    }
  },
  data: function() {
    return {
      saveFlag: false,
      functionInfoList: [],
      keyWords: "",
      showAddDiagLogFlag: false,
      addForm: {
        name: "",
        desc: ""
      },
      addFormRules: {
        name: [
          { required: true, message: "请输入名称", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (
                this.functionInfoList.map(item => item.name).includes(value)
              ) {
                callback("名称已存在");
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    let functionInfoList = localStorage.getItem("functionList");
    console.log(functionInfoList);
    if (
      functionInfoList != null &&
      functionInfoList != "" &&
      functionInfoList != "undefined" &&
      functionInfoList != "null"
    ) {
      this.functionInfoList = JSON.parse(functionInfoList);
    }
    this.saveFlag = true;
  },
  methods: {
    saveData() {
      if (this.saveFlag) {
        localStorage.setItem(
          "functionList",
          JSON.stringify(this.functionInfoList)
        );
      }
    },
    addFunctionInfo() {
      this.functionInfoList.push(this.addForm);
      this.showAddDiagLogFlag = false;
    },
    showAddModel() {
      this.addForm = { name: "", desc: "" };
      this.showAddDiagLogFlag = true;
    },
    editCommit(index, data) {
      this.$set(this.functionInfoList[index], "functionInfo", data);
      this.$message.success("保存成功");
    }
  }
};
</script>

<style lang="css" scoped>
.head {
  margin-bottom: 10px;
}
</style>