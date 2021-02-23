<template>
  <div
    data-name="stepper-container"
    :class="renderClass('mx-4 p-4', 'container')"
  >
    <div class="flex items-center">
      <template v-for="(item, index) in items" :key="`stepper-item-${index}`">
        <div
          data-name="stepper-itemContainer"
          :class="[
            {
              'cursor-pointer': clickable && !item.locked,
              'cursor-not-allowed': item.locked
            },
            renderClass(
              'flex items-center text-gray-400 relative',
              'itemContainer'
            )
          ]"
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
            :class="[
              renderClass(
                'flex items-center justify-center rounded-full transition-all duration-500 ease-in-out h-12 w-12 py-3 border-2',
                'circle',
                {
                  'border-gray-400': !isActive(index) && !isComplete(index)
                }
              ),

              renderClass(
                `${isActive(index) ? `border-${variant} text-${variant}` : ''}`,
                'activeCircle'
              ),
              renderClass(
                `${
                  isComplete(index) ? `border-${variant} text-${variant}` : ''
                }`,
                'completeCircle'
              )
            ]"
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
              {{ item[label] || index + 1 }}
            </template>
          </div>
          <div
            v-if="item[text]"
            data-name="stepper-text"
            :class="
              renderClass(
                'absolute right-1/2 transform translate-x-1/2 text-center mt-16 text-xs text-gray-500',
                'text'
              )
            "
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
            data-name="stepper-line"
            :class="
              renderClass(
                `${
                  isComplete(index + 1) || isActive(index + 1)
                    ? `bg-${variant}`
                    : 'bg-gray-400'
                } flex-auto h-0.5 transition-all duration-400 ease-in-out`,
                'line'
              )
            "
          ></div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from "vue";
import { variants } from "@/utility/css-helper";
import { useRenderClass } from "@/compositionFunctions/settings";

export default defineComponent({
  name: "TStepper",
  props: {
    modelValue: { type: [String, Number], default: 0 },
    items: {
      type: Array as PropType<Array<{ [key: string]: string }>>,
      default: () => []
    },
    label: { type: String, default: () => inject("t-stepper-label", "label") },
    value: { type: String, default: () => inject("t-stepper-value", "value") },
    text: { type: String, default: () => inject("t-stepper-text", "text") },
    variant: {
      type: String,
      default: () => inject("t-stepper-variant", "primary"),
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      }
    },
    clickable: {
      type: Boolean,
      default: () => inject("t-stepper-clickable", false)
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
    // watchEffect(() => {
    //   console.log("activeIndex", activeIndex.value);
    //   console.log("modelValue", props.modelValue);
    // });
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
    const { renderClass } = useRenderClass("bottomSheet");
    return {
      renderClass,
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