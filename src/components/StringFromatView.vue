<template>
  <div>
    <!-- form，水平居中 -->
    <div v-if="params != null && params.length > 0">
      <el-form
        style="text-align: center;"
        :inline="true"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <!-- 输入框 -->

        <el-form-item v-for="param in params" :key="param.key" :label="param.label">
          <el-input v-model="form[param.key]"></el-input>
        </el-form-item>
        <!-- 查询&重置按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
          <el-button @click="init">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
  props: {
    value: Object,
    default: null
  },
  components: {
    CopyResultView
  },
  data: () => {
    return {
      printFunction: "",
      params: [],
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
    console.log("data", this.value);
    //初始化form
    this.setData(this.value);
  },
  methods: {
    setData(data) {
      if (data != null) {
        this.params = data.params;
        if (this.params == null || this.params.length == 0) {
          try {
            let print = (label, text) => {
              result.push({ label, text });
            };
            //运行
            eval("(() => (" + data.printFunction + "))();")({}, print);
            //获取结果
            this.resultList = result;
          } catch (error) {
            this.resultList = [{ label: "", text: data.printFunction }];
          }
          return;
        }
        this.printFunction = eval("(() => (" + data.printFunction + "))();");
        this.init();
      }
    },

    init() {
      this.form = {};
      this.params.forEach(param => {
        Vue.set(this.form, param.key, param.default);
      });
      this.resultList = [];
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
        this.printFunction(form, print);
        //获取结果
        this.resultList = result;
      } catch (e) {
        console.error(e);
        this.$message.error(`发生了错误，${e}`);
      }
    }
  }
};
</script>

<style>
</style>