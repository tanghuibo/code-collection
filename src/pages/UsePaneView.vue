<template>
  <div>
    <div class="head">
      <el-input style="width: 300px;" placeholder="请输入内容" v-model="keyWords">
        <template slot="prepend">查询</template>
      </el-input>
    </div>
    <el-table border stripe :data="showList">
      <el-table-column type="expand">
        <template slot-scope="props">
          <StringFromatView :value="props.row.functionInfo" />
        </template>
      </el-table-column>
      <el-table-column label="方法名称" prop="name"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import StringFromatView from "@/components/StringFromatView";
export default {
  components: { StringFromatView },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
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
  data: () => ({
    functionInfoList: [],
    keyWords: ""
  }),
  mounted() {
    this.functionInfoList = this.value;
  }
};
</script>

<style lang="css" scoped>
.head {
  margin-bottom: 10px;
}
</style>