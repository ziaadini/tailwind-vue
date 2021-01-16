<template>
  <div :class="{ 'h-0 overflow-hidden': !isActive }">
    <div
      class="transform transition-all ease-in duration-500"
      :class="{ 'opacity-0': !isActive }"
    >
      <!--      <template v-if="isActive">-->
      <slot></slot>
      <!--      </template>-->
    </div>
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
      value => {
        isActive.value = index.value === value;
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
