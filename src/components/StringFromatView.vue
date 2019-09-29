<template>
  <div>
    <!-- form，水平居中 -->
    <el-form style="text-align: center;" :inline="true" ref="form" :model="form" label-width="80px">
      <!-- 输入框 -->
      <el-form-item v-for="param in paramList" :key="param.key" :label="param.label">
        <el-input v-model="form[param.key]"></el-input>
      </el-form-item>
      <!-- 查询&重置按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onQuery">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <!-- 结果面板 -->
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
      /**
       * from表单数据
       */
      form: {},
      /**
       * 参数列表
       */
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
      /**
       * 获取结果方法
       */
      getResultFunction: function($, print) {
        print("问候语", `${$.name}, 你好`);
        print("猜测", `结果: ${$.value}`);
        print("", "好像有问题？");
      },
      /**
       * 运行结果
       */
      resultList: []
    };
  },
  mounted() {
    //初始化form
    this.paramList.forEach(param => {
      Vue.set(this.form, param.key, param.default);
    });
  },
  methods: {
    /**
     * 触发查询方法
     */
    onQuery() {
      // 拷贝入参
      let { ...form } = this.form;
      let result = [];
      //打印参数方法
      let print = (label, text) => {
        result.push({ label, text });
      };
      //运行
      this.getResultFunction(form, print);
      //获取结果
      this.resultList = result;
    },
    /**
     * 初始化form
     */
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