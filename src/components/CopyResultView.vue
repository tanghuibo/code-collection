<template>
  <div>
    <!-- <el-table size="mini" :data="tabelData">
      <el-table-column prop="text" label="内容"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="copy(scope.row.text)" type="text" size="small">复制</el-button>
        </template>
      </el-table-column>
    </el-table>-->
    <div v-for="text in value" :key="text">
      <div :title="text" class="chrome-plugin-string-fromat-copy-text">{{text}}</div>
      <el-button class="chrome-plugin-string-fromat-copy-button" @click="copy(text)" type="text">复制</el-button>
    </div>
  </div>
</template>

<script>
import copy from "copy-to-clipboard";
export default {
  props: {
    value: {
      type: Array,
      default: ""
    }
  },
  computed: {
    tabelData() {
      return this.value.map(text => ({ text }));
    }
  },
  methods: {
    copy(data) {
      copy(data);
      this.$message("复制成功");
    }
  }
};
</script>

<style scoped>
.chrome-plugin-string-fromat-copy-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80%;
  display: inline-block;
  vertical-align: middle;
  padding: 5px 2px;
  padding-left: 5px;
  font-size: 14px;
}
.chrome-plugin-string-fromat-copy-button {
  vertical-align: middle;
  padding: 5px 2px;
}
</style>