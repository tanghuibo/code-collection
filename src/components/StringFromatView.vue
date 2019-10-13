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
  computed: {
    paramList() {
      return this.value.paramList;
    },
    getResultFunction() {
      return eval("(() => (" + this.value.getResultFunction + "))();");
    }
  },
  data: () => {
    return {
      value: {
        getResultFunction: "",
        paramList: []
      },
      /**
       * from表单数据
       */
      form: {},
      /**
       * 运行结果
       */
      resultList: []
    };
  },
  mounted() {
    //初始化form
    this.init();
  },
  methods: {
    setData(data) {
      if (data != null) {
        this.value.paramList = data.params;
        this.value.getResultFunction = data.printFunction;
      }
    },

    init() {
      this.form = {};
      this.paramList.forEach(param => {
        Vue.set(this.form, param.key, param.default);
      });
    },
    /**
     * 触发查询方法
     */
    onQuery() {
      // 拷贝入参
      try {
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
      } catch (e) {
        console.error(e);
        this.$message.error(`发生了错误，${e}`);
      }
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