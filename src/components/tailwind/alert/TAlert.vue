<template>
  <div
    class="mb-4 border-r-4 rounded-sm px-4 py-4"
    v-if="show"
    :class="wrapperColor"
    role="alert"
  >
    <div class="flex items-start">
      <div class="" v-if="icon">
        <t-icon :name="icon"></t-icon>
      </div>

      <div>
        <p class="text-sm">
          <slot></slot>
        </p>
      </div>

      <div class="flex-1 flex justify-end items-center">
        <div class="cursor-pointer" @click="closeAlert">
          <svg
            class="fill-current h-4 w-4 mr-4"
            :class="svgColor + ' hover:' + wrapperColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TIcon from "@/components/tailwind/icon/TIcon.vue";
import { variants } from "@/utility/css-helper";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  components: { TIcon },
  setup(props, { emit }) {
    const show = ref(true);
    const shade = computed(() => {
      return `bg-${props.variant}-50 text-${props.variant} border-${props.variant}-50`;
    });
    const wrapperColor = computed(() => {
      return shade.value;
    });
    const svgColor = () => {
      return `text-${props.variant}-500`;
    };

    const closeAlert = () => {
      show.value = false;
      emit("closeClick", true);
    };

    return {
      shade,
      wrapperColor,
      svgColor,
      show,
      closeAlert
    };
  },
  props: {
    icon: {
      required: false,
      default: "",
      type: String,
    },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        return !!variants[propValue];
      },
    },
  },
});
</script>
