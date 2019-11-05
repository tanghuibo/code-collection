<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="event=='add' ? '新增': '编辑'"
    :visible.sync="visible"
    fullscreen
  >
    <el-form
      v-if="visible"
      :value="functionInfo"
      ref="form"
      :model="form"
      :rules="formRules"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="方法">
        <EditFunctionView :value="functionInfo" ref="functionView" />
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%; margin-top: 10px;"
          type="primary"
          @click="submit"
        >{{this.event== 'add' ? '立即创建': '保存'}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import uuid from "uuid";
import EditFunctionView from "./EditFunctionView";
export default {
  components: {
    EditFunctionView
  },
  data: function() {
    return {
      form: {
        name: "",
        desc: ""
      },
      functionInfo: {
        params: [{ key: "", label: "" }],
        printFunction: ""
      },
      event: "add",
      nameList: [],
      exceptionName: [],
      visible: false,
      formRules: {
        name: [
          { required: true, message: "请输入名称", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (this.exceptionName.includes(value)) {
                callback();
              } else if (this.nameList.includes(value)) {
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
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let result = this.$refs.functionView.getData();
          if (result == null || !result.success) {
            return;
          }
          this.form.functionInfo = result.data;
          if (this.event == "add") {
            this.$emit("addSubmit", this.form);
          } else if (this.event == "edit") {
            this.$emit("editSubmit", this.form);
          }
          this.visible = false;
        }
      });
    },
    add(nameList) {
      this.event = "add";

      this.form = {
        name: "",
        desc: "",
        id: uuid()
      };
      this.functionInfo = {
        params: [{ key: "name", label: "名称" }],
        printFunction: `function($, pt) { 
  pt("问候语", \`你好\${$.name}\`);
}`
      };
      this.nameList = nameList;
      this.exceptionName = [];
      this.visible = true;
    },
    edit(nameList, data) {
      this.event = "edit";
      this.form = { ...data };
      this.functionInfo = data.functionInfo;
      this.exceptionName = [data.name];
      this.nameList = nameList;
      this.visible = true;
    }
  }
};
</script>

<style>
</style>