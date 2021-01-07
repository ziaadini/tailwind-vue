<template>
  <div>
    <label
      v-if="label"
      for="price"
      class="block text-sm font-medium text-gray-700 text-right"
    >
      {{ label }}
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <div
        v-if="leftPadding"
        class="absolute inset-y-0 left-2 flex items-center"
      >
        <span v-if="leftIcon" class="material-icons">
          {{ leftIcon }}
        </span>
        <template v-else>
          <slot name="rightSlot" />
        </template>
      </div>
      <input
        type="text"
        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        :class="{
          ' pr-8': rightPadding,
          ' pr-3': !rightPadding,
          ' pl-8': leftPadding,
          ' pl0-3': !leftPadding
        }"
      />
      <div
        v-if="rightPadding"
        class="absolute inset-y-0 right-2 flex items-center pointer-events-none"
      >
        <span v-if="rightIcon" class="material-icons">
          {{ rightIcon }}
        </span>
        <template v-else>
          <slot name="rightSlot" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "TTextInput",
  props: {
    label: {
      required: false,
      type: String,
      default: ""
    },
    leftIcon: {
      required: false,
      type: String,
      default: ""
    },
    rightIcon: {
      required: false,
      type: String,
      default: ""
    }
  },
  setup(props, { slots }) {
    const rightPadding = computed(
      (): boolean => !!(slots.rightSlot || props.rightIcon)
    );
    const leftPadding = computed(
      (): boolean => !!(slots.leftSlot || props.leftIcon)
    );

    return { rightPadding, leftPadding };
  }
});
</script>
