<template>
  <div>
    <div class="head">
      <el-input
        style="width: 300px;"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="keyWords"
      ></el-input>
    </div>
    <el-table max-height="calc(100vh - 180px)" border stripe :data="showList">
      <el-table-column label="方法名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column width="260" label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button icon="el-icon-caret-right" circle type="success" @click="() => run(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <StringFromatViewDialog ref="runDialog" />
  </div>
</template>

<script>
import StringFromatViewDialog from "@/components/StringFromatViewDialog";
import service from "@/js/service.js";
let { getData, saveData } = service;
import langUtil from "@/js/langUtil.js";
let { likes } = langUtil;
export default {
  components: { StringFromatViewDialog },
  computed: {
    showList() {
      let keyWords = this.keyWords;
      if (keyWords == null || keyWords.trim() == "") {
        return this.functionInfoList;
      }
      keyWords = keyWords.trim();

      return this.functionInfoList.filter(item =>
        likes([item.name, item.desc], keyWords)
      );
    }
  },
  methods: {
    run(data) {
      this.$refs.runDialog.show(data);
    }
  },
  data: () => ({
    functionInfoList: [],
    keyWords: ""
  }),
  mounted() {
    this.functionInfoList = getData();
  }
};
</script>

<style lang="css" scoped>
.head {
  margin-bottom: 10px;
}
</style>