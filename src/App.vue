<template>
  <div id="app">
    <div>
      <AddStringFormatView v-if="param == null" @add="add"/>
      <StringFromatView v-if="param" :value="param" />
    </div>
  </div>
</template>

<script>
import StringFromatView from "@/components/StringFromatView";
import AddStringFormatView from '@/components/AddStringFormatView';
export default {
  name: "app",
  components: {
    StringFromatView,
    AddStringFormatView
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
