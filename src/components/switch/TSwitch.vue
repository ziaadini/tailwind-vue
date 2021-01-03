<template>
  <div class="flex justify-between items-center" @click="updateInput">
    <div
      class="w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
      :class="{ 'bg-green-400': isChecked }"
    >
      <div
        class="bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out"
        :class="{ '-translate-x-8': isChecked }"
      ></div>
    </div>
    <label class="mr-2">{{ label }}</label>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    modelValue: { default: "" },
    value: { type: [String, Number] },
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
    const updateInput = () => {
      const isActive = !isChecked.value;
      if (props.modelValue instanceof Array) {
        const newValue = [...props.modelValue];
        if (isActive) {
          newValue.push(props.value);
        } else {
          newValue.splice(newValue.indexOf(props.value), 1);
        }
        emit("update:modelValue", newValue);
      } else {
        emit(
          "update:modelValue",
          isActive ? props.trueValue : props.falseValue
        );
      }
    };

    return { isChecked, updateInput };
  },
  data() {
    return {
      toggleActive: false
    };
  }
};
</script>
