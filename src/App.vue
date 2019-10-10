<template>
  <div id="app">
    <div>
      <EditView v-if="param == null" @add="add" />
      <StringFromatView v-if="param" :value="param" />
    </div>
  </div>
</template>

<script>
import EditView from "@/components/EditView";
import StringFromatView from "@/components/StringFromatView";
export default {
  name: "app",
  components: {
    StringFromatView,
    EditView
  },
  methods: {
    add(data) {
      this.param = data;
    }
  },
  data: () => ({
    param: null
  })
};
</script>

<style>
</style>
