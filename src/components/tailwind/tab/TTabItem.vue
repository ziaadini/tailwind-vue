<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount, inject } from "vue";
export default defineComponent({
  name: "TTabItem",
  setup() {
    const index = ref(0);
    const isActive = ref(false);

    const tabs = inject("TabsProvider") as any;

    watch(
      () => tabs.selectedIndex,
      () => {
        isActive.value = index.value === tabs.selectedIndex;
      }
    );

    onBeforeMount(() => {
      index.value = tabs.count;
      tabs.count++;
      isActive.value = index.value === tabs.selectedIndex;
    });
    return { index, isActive };
  }
});
</script>
