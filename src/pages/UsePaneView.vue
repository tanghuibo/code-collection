<template>
  <div>
    <div class="head">
      <el-input style="width: 300px;" placeholder="请输入内容" v-model="keyWords">
        <template slot="prepend">查询</template>
      </el-input>
    </div>
    <el-table border stripe :data="showList">
      <el-table-column label="方法名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column width="260" label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-caret-righ"
            type="success"
            @click="() => run(scope.row)"
          >运行</el-button>
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
export default {
  components: { StringFromatViewDialog },
  computed: {
    showList() {
      let keyWords = this.keyWords;
      if (keyWords == null || keyWords.trim() == "") {
        return this.functionInfoList;
      }
      keyWords = keyWords.trim();

      return this.functionInfoList.filter(
        item =>
          item.name.indexOf(keyWords) >= 0 || item.desc.indexOf(keyWords) >= 0
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