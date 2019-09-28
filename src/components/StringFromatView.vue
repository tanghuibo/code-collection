<template>
  <div>
    <el-form size="mini" :inline="true" ref="form" :model="form" label-width="80px">
      <el-form-item v-for="param in paramList" :key="param.key" :label="param.label">
        <el-input v-model="form[param.key]"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <CopyResultView :value="resultList" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import CopyResultView from "@/components/CopyResultView";
export default {
  name: "StringFromatView",
  components: {
    CopyResultView
  },
  data: () => {
    return {
      form: {},
      paramList: [
        {
          label: "名称",
          key: "name",
          default: null
        },
        {
          label: "数值",
          key: "value",
          default: null
        }
      ],
      resultList: ["天之涯", "地之角", "唱歌还跑调"]
    };
  },
  mounted() {
    this.paramList.forEach(param => {
      Vue.set(this.form, param.key, param.default);
    });
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      this.resultList = ["你知道我对你不仅仅是喜欢～"];
    },
    onReset() {
      this.paramList.forEach(param => {
        this.form[param.key] = param.default;
      });
    }
  }
};
</script>

<style>
</style>