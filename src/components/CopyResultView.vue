<template>
  <div>
    <!-- 动画 -->
    <transition-group name="string-fromat-chrome-plugin-list">
      <div v-for="item in value" :key="item.label + ':' + item.text">
        <el-row :gutter="10">
          <!-- 标签 -->
          <el-col :span="3" style="text-align: right;">
            <el-tag :type="item.label ? null : 'warning'">{{ item.label ? item.label : "无标签" }}</el-tag>
          </el-col>
          <!-- 内容 -->
          <el-col :span="18">
            <el-tooltip effect="dark" :content="item.text" placement="top">
              <el-input :readonly="true" width="300" v-model="item.text"></el-input>
            </el-tooltip>
          </el-col>
          <!-- 复制按钮 -->
          <el-col :span="3" style="text-align: left;">
            <el-button @click="copy(item.text)" type="text">复制</el-button>
          </el-col>
        </el-row>
      </div>
    </transition-group>
  </div>
</template>

<script>
import copy from "copy-to-clipboard";
export default {
  props: {
    /**
     * 入参
     */
    value: {
      type: Array,
      default: ""
    }
  },
  methods: {
    /**
     * 复制方法
     */
    copy(text) {
      copy(text);
      this.$message("复制成功");
    }
  }
};
</script>

<style scoped>
/** 插入过程 */
.string-fromat-chrome-plugin-list-enter-active {
  transition: all 0.3s;
}
/** 移除过程 **/
.list-leave-active {
  transition: all 0.3s;
}
.string-fromat-chrome-plugin-list-enter,
.string-fromat-chrome-plugin-list-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>