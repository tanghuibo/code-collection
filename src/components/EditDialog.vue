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
          :loading="loading"
        >{{this.event== 'add' ? '立即创建': '保存'}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import service from "../js/service";
import EditFunctionView from "./EditFunctionView";
import { async } from "q";
let { addOne, updateById } = service;
export default {
  components: {
    EditFunctionView
  },
  data: function() {
    return {
      form: {
        id: null,
        name: "",
        desc: "",
        functionInfo: null
      },
      functionInfo: {
        params: [{ key: "", label: "" }],
        printFunction: ""
      },
      event: "add",
      visible: false,
      loading: false,
      formRules: {
        name: [{ required: true, message: "请输入名称", trigger: "change" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            let result = this.$refs.functionView.getData();
            if (result == null || !result.success) {
              return;
            }
            this.form.functionInfo = result.data;
            if (this.event == "add") {
              await addOne(this.form);
              this.$emit("afterSuccess", "新增成功");
            } else if (this.event == "edit") {
              await updateById(this.form);
              this.$emit("afterSuccess", "更新成功");
            }
            this.visible = false;
          } catch (e) {
            if (typeof e === "string") {
              this.$message.error(e);
            } else {
              console.error(e);
              this.$message.error("发生未知错误");
            }
          } finally {
            this.loading = false;
          }
        }
      });
    },
    add() {
      this.event = "add";
      this.form = {
        name: "",
        desc: ""
      };
      this.functionInfo = {
        params: [{ key: "name", label: "名称" }],
        printFunction: `function({name}, print) { 
  print("问候语", \`你好\${name}\`);
}`
      };
      this.visible = true;
    },
    edit(data) {
      this.event = "edit";
      this.form = { ...data };
      this.functionInfo = data.functionInfo;
      this.visible = true;
    }
  }
};
</script>

<style>
</style>