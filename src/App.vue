<template>
  <div id="app">
    <TreeView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TreeView from './components/TreeView.vue';

export default defineComponent({
  components: {
    TreeView,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
