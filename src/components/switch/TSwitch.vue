<template>
  <div
    class="flex justify-between items-center"
    @click="toggleActive = !toggleActive"
  >
    <div
      class="w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
      :class="{ 'bg-green-400': toggleActive }"
    >
      <div
        class="bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out"
        :class="{ '-translate-x-8': toggleActive }"
      ></div>
    </div>
    <label class="mr-2">{{ label }}</label>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  model: {
    prop: "modelValue",
    event: "change"
  },
  props: {
    modelValue: { default: "" },
    value: { type: String },
    label: { type: String, default: "" },
    trueValue: { default: true },
    falseValue: { default: false }
  },

  setup(props, { emit }) {
    const isChecked = computed(() => {
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value);
      }
      return props.modelValue === props.trueValue;
    });
    const updateInput = event => {
      const isChecked = event.target.checked;
      if (props.modelValue instanceof Array) {
        const newValue = [...this.modelValue];
        if (isChecked) {
          newValue.push(props.value);
        } else {
          newValue.splice(newValue.indexOf(props.value), 1);
        }
        emit("change", newValue);
      } else {
        emit("change", isChecked ? props.trueValue : props.falseValue);
      }
    };

    return { isChecked };
  },
  data() {
    return {
      toggleActive: false
    };
  }
};
</script>
