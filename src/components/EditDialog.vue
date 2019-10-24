<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="event=='add' ? '新增': '编辑'"
    :visible.sync="showAddDiagLogFlag"
    width="30%"
  >
    <el-form ref="form" :model="form" :rules="formRules" label-position="right" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">{{this.event== 'add' ? '立即创建': '保存'}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      form: {
        name: "",
        desc: "",
        functionInfo: {
          params: [{ key: "", label: "" }],
          printFunction: ""
        }
      },
      index: -1,
      event: "add",
      nameList: [],
      exceptionName: [],
      showAddDiagLogFlag: false,
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
          if (this.event == "add") {
            this.$emit("addSubmit", this.form);
          } else if (this.event == "edit") {
            this.$emit("editSubmit", this.form, this.index);
          }
          this.showAddDiagLogFlag = false;
        }
      });
    },
    add(nameList) {
      this.event = "add";
      this.showAddDiagLogFlag = true;
      this.form = {
        name: "",
        desc: "",
        functionInfo: {
          params: [{ key: "name", label: "名称" }],
          printFunction: `function($, pt) { 
  pt("问候语", \`你好\${$.name}\`);
}`
        }
      };
      this.nameList = nameList;
      this.exceptionName = [];
      this.index = -1;
    },
    edit(nameList, data, index) {
      this.event = "edit";
      this.showAddDiagLogFlag = true;
      this.form = { ...data };
      this.exceptionName = [data.name];
      this.nameList = nameList;
      this.index = index;
    }
  }
};
</script>

<style>
</style>