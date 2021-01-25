<template>
  <div class="container mx-auto w-full h-full">
    <div class="relative flex-wrap  h-full">
      <div
        data-name="timeline-line"
        class="absolute border-opacity-20 border-gray-700 h-full border"
        :class="getLineByDirection"
      ></div>

      <div
        v-for="(item, index) in items"
        :key="`time-line-item-${index}`"
        class="mb-8 flex justify-between items-center w-full right-timeline"
        :class="getRowByDirection(index)"
      >
        <div
          class="order-1 w-5/12"
          :class="getEmptySpaceByDirection"
          data-name="timeline-emptySpace"
        >
          <slot
            name="empty-space"
            :isActive="isActive(index)"
            :isComplete="isComplete(index)"
            v-bind="item"
            :index="index"
          ></slot>
        </div>
        <div
          data-name="timeline-circle"
          class="z-10 flex items-center bg-white text-sm border-2 order-1 shadow-xl  min-w-8 min-h-8 rounded-full"
          :class="[
            {
              'cursor-pointer': clickable && !item.locked,
              'cursor-not-allowed': item.locked
            },
            getCircleByDirection,
            isComplete(index) || isActive(index)
              ? `border-${variant} text-${variant}`
              : 'border-gray-400'
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
          <div v-else class="mx-auto">
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
        </div>
        <template v-if="hasItemSlot">
          <slot
            name="item"
            :isActive="isActive(index)"
            :isComplete="isComplete(index)"
            v-bind="item"
            :index="index"
          ></slot>
        </template>
        <div
          v-else
          data-name="timeline-item"
          class="order-1 px-4"
          :class="getItemByDirection"
        >
          <t-card
            class="text-sm py-4 bg-white"
            :title="item.title"
            :description="item.text"
          ></t-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { variants } from "@/utility/css-helper";
import { computed, defineComponent, PropType } from "vue";
import TCard from "../card/TCard.vue";

export default defineComponent({
  components: { TCard },
  props: {
    modelValue: { type: [String, Number], default: 0 },
    align: {
      type: String as PropType<string>,
      validator: (value: string) => {
        return ["both", "right", "left"].includes(value);
      },
      default: "both"
    },
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
    const getRowByDirection = index => {
      if (props.align === "both") {
        return index % 2 === 0
          ? "sm:flex-row flex-row-reverse"
          : "flex-row-reverse flex-row";
      } else if (props.align === "right") {
        return "flex-row-reverse";
      } else if (props.align === "left") {
        return "flex-row";
      }
    };

    const getLineByDirection = computed(() => {
      if (props.align === "both") {
        return "sm:left-1/2 left-0";
      } else if (props.align === "right") {
        return "left-0";
      } else {
        return "right-0";
      }
    });
    const getEmptySpaceByDirection = computed((): string => {
      if (props.align === "both") {
        return "sm:block hidden";
      } else if (props.align === "right") {
        return "hidden";
      } else {
        return "hidden";
      }
    });
    const getCircleByDirection = computed((): string => {
      if (props.align === "both") {
        return "sm:translate-x-0 -translate-x-1/2 transform";
      } else if (props.align === "right") {
        return "transform -translate-x-1/2";
      } else {
        return "transform translate-x-1/2";
      }
    });
    const getItemByDirection = computed((): string => {
      if (props.align === "both") {
        return "sm:w-5/12 w-full";
      } else if (props.align === "right") {
        return "w-full";
      } else {
        return "w-full";
      }
    });

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

    return {
      hasCircleSlot: !!slots.circle,
      hasLabelSlot: !!slots.label,
      hasItemSlot: !!slots.item,
      onItemClicked,
      isActive,
      isComplete,
      getRowByDirection,
      getLineByDirection,
      getEmptySpaceByDirection,
      getCircleByDirection,
      getItemByDirection
    };
  }
});
</script>
