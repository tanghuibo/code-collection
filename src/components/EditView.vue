<template>
  <div style="overflow: hidden;">
    <el-container style="height: 98vh; border: 1px solid #eee">
      <el-aside width="350px" style="background-color: rgb(238, 241, 246)">
        <EditTreeView @clickNode="addToEdit" @nodeRemove="nodeRemove" />
      </el-aside>
      <el-main>
        <EditFunctionView ref="editFunctionView" @commit="commitData" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import EditFunctionView from "@/components/EditFunctionView";
import EditTreeView from "@/components/EditTreeView";
export default {
  data: () => ({
    editData: null,
    editFunction: null
  }),
  components: {
    EditTreeView,
    EditFunctionView
  },
  methods: {
    commitData(data) {
      console.log("init");
      if (this.editFunction) {
        this.editFunction(data);
      }
    },
    addToEdit(editData, editFunction) {
      this.editData = editData;
      this.editFunction = editFunction;
      console.log(this.$refs, this);
      this.$refs.editFunctionView.setEditData(editData.data, editData.label);
    },
    nodeRemove(removeData) {
      if (this.editFunction == null) {
        return;
      }
      if (removeData.id === this.editData.id) {
        this.editData = null;
        this.editFunction = null;
        console.log("delete");
        
        this.$refs.editFunctionView.close();
      }
    }
  }
};
</script>

<style>
</style>