<template>
  <div class="mx-4 p-4">
    <div class="flex items-center">
      <template v-for="(item, index) in items" :key="`stepper-item-${index}`">
        <div
          class="flex items-center text-gray-400 relative"
          :class="{
            'cursor-pointer': clickable && !item.locked,
            'cursor-not-allowed': item.locked
          }"
          @click="onItemClicked({ item, index })"
        >
          <template v-if="hasCircleSlot">
            <slot
              name="circle"
              :isActive="isActive(index)"
              :isComplete="isComplete(index)"
              v-bind="item"
              :index="index"
            ></slot>
          </template>
          <div
            v-else
            class="flex items-center justify-center rounded-full transition-all duration-500 ease-in-out h-12 w-12 py-3 border-2"
            :class="
              isComplete(index) || isActive(index)
                ? `border-${variant} text-${variant}`
                : 'border-gray-400'
            "
          >
            <template v-if="hasLabelSlot">
              <slot
                name="label"
                :isActive="isActive(index)"
                :isComplete="isComplete(index)"
                v-bind="item"
                :index="index"
              ></slot>
            </template>
            <template v-else>
              {{ item[label] || "" }}
            </template>
          </div>
          <div
            v-if="item[text]"
            class="absolute right-1/2 transform translate-x-1/2 text-center mt-16 text-xs text-gray-500"
          >
            <template v-if="hasTextSlot">
              <slot
                name="text"
                :isActive="isActive(index)"
                :isComplete="isComplete(index)"
                v-bind="item"
                :index="index"
              ></slot>
            </template>
            <template v-else>
              <div class="mt-4">
                {{ item[text] }}
              </div>
            </template>
          </div>
        </div>
        <template v-if="index !== items.length - 1">
          <div
            class="flex-auto h-0.5 transition-all duration-400 ease-in-out"
            :class="
              isComplete(index + 1) || isActive(index + 1)
                ? `bg-${variant}`
                : 'bg-gray-400'
            "
          ></div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watchEffect } from "vue";
import { variants } from "@/utility/css-helper";

export default defineComponent({
  name: "TStepper",
  props: {
    modelValue: { type: [String, Number], default: 0 },
    items: {
      type: Array as PropType<Array<{ [key: string]: string }>>,
      default: () => []
    },
    label: { type: String, default: "label" },
    value: { type: String, default: "value" },
    text: { type: String, default: "text" },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      }
    },
    clickable: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, { slots, emit }) {
    const activeIndex = computed((): number => {
      const index = props.items.findIndex(
        item => item[props.value] === props.modelValue
      );
      if (index != -1) {
        return index;
      } else if (typeof props.modelValue === "number") {
        return props.modelValue;
      } else {
        return -1;
      }
    });
    watchEffect(() => {
      console.log("activeIndex", activeIndex.value);
      console.log("modelValue", props.modelValue);
    });
    const isActive = computed(() => (index): boolean => {
      return index === activeIndex.value;
    });

    const isComplete = computed(() => (index): boolean => {
      return index < activeIndex.value;
    });
    const onItemClicked = ({ item, index }) => {
      props.clickable &&
        !item.locked &&
        emit("update:modelValue", item[props.value] ?? index);
    };
    return {
      onItemClicked,
      activeIndex,
      isActive,
      isComplete,
      hasLabelSlot: !!slots.label,
      hasCircleSlot: !!slots.circle,
      hasTextSlot: !!slots.text
    };
  }
});
</script>

<style scoped></style>
