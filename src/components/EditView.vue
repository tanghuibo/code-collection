<template>
  <div style="overflow: hidden;">
    <el-container style="height: 98vh; border: 1px solid #eee">
      <el-aside width="350px" style="background-color: rgb(238, 241, 246)">
        <EditTreeView @changeMode="changeMode" @clickNode="changeNoode" @removeNode="removeNode" />
      </el-aside>
      <el-main>
        <EditFunctionView v-if="editMode" ref="editFunctionView" @commit="commitData" />
        <StringFromatView  v-if="!editMode" ref="runFunctionView"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import EditFunctionView from "@/components/EditFunctionView";
import StringFromatView from '@/components/StringFromatView'
export default {
  data: () => ({
    activationNode: null,
    editFunction: null,
    editMode: false
  }),
  components: {
    EditFunctionView,
    StringFromatView
  },
  methods: {
    changeMode(editMode) {
      this.editMode = editMode;
    },
    commitData(data) {
      if (this.editFunction) {
        this.editFunction(data);
      }
    },
    changeNoode(activationNode, editFunction) {
      this.activationNode = activationNode;
      this.editFunction = editFunction;
      if(this.editMode) {
        this.$refs.editFunctionView.setEditData(activationNode.data, activationNode.label);
      } else {
        console.log(activationNode);
        this.$refs.runFunctionView.setData(activationNode.data);
      }
      
    },
    removeNode(removeData) {
      if (this.editFunction == null) {
        return;
      }
      if (removeData.id === this.activationNode.id) {
        this.activationNode = null;
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