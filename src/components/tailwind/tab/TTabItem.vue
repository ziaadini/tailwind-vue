<template>
  <div :class="{ 'h-0 overflow-hidden': !isActive }">
    <div
      class="transform transition-all ease-in duration-300"
      :class="{ 'opacity-0': !isActive }"
    >
      <template v-if="activeOnce || eager">
        <slot :isActive="isActive" :index="index"></slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  onBeforeMount,
  inject,
  watchEffect
} from "vue";
export default defineComponent({
  name: "TTabItem",
  props: {
    eager: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const index = ref(0);
    const isActive = ref(false);
    const activeOnce = ref(false);
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
    watchEffect(() => {
      if (isActive.value) {
        activeOnce.value = true;
      }
    });
    return { index, isActive, activeOnce };
  }
});
</script>
