<template>
  <div>
    <EditTreeView @clickNode="addToEdit" @nodeRemove="nodeRemove" />
    <EditFunctionView v-if="editFunction" :editData="editData.data" @commit="commitData" />
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
      console.log(editData);
      this.editData = editData;
      this.editFunction = null;
      setTimeout(() => {
        this.editFunction = editFunction;
      }, 0);
    },
    nodeRemove(removeData) {
      if (this.editData == null) {
        return;
      }
      if (removeData.id === this.editData.id) {
        this.editData = null;
        this.editFunction = null;
      }
    }
  }
};
</script>

<style>
</style>