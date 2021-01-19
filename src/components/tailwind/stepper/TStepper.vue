<template>
  <div class="mx-4 p-4">
    <div class="flex items-center">
      <template v-for="(item, index) in items" :key="`stepper-item-${index}`">
        <div class="flex items-center text-teal-600 relative">
          <div
            class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600"
          >
            {{ item.label }}
          </div>
          <div
            class="absolute  right-1/2 transform translate-x-1/2 text-center mt-16 text-xs font-medium  text-teal-600"
          >
            <div class="mt-4">
              {{ item.text }}
            </div>
          </div>
        </div>
        <template v-if="index !== items.length - 1">
          <div
            class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"
          ></div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TStepper",
  props: {
    modelValue: { type: [String, Number], default: 0 },
    items: {
      type: Array as PropType<Array<{ [key: string]: string }>>,
      default: () => [
        { label: "p", text: "personal" },
        { label: "t", text: "tailwind", value: "t" },
        { label: "v", text: "vue" }
      ]
    }
  },
  setup(props) {
    const activeIndex = computed(() => {
      const index = props.items.findIndex(
        item => item.value === props.modelValue
      );
      return index === -1 ? props.modelValue : index;
    });
    return {activeIndex}
  }
});
</script>

<style scoped></style>
