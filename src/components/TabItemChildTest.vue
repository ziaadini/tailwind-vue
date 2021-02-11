<template>
  <div>تست تب</div>
</template>

<script>
import { onUnmounted, onActivated, onMounted } from "vue";

export default {
  name: "TabItemChildTest",
  setup() {
    onMounted(() => {
      console.log("mounted called");
    });
    onUnmounted(() => {
      console.log("unmounted called");
    });
    onActivated(() => {
      console.log("onActivated called");
    });
  }
};
</script>

<style scoped></style>
