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
import TIcon from "@/components/icon/TIcon.vue";
import { variants } from "@/utility/css-helper";
import { defineComponent } from "vue";

export default defineComponent({
  components: { TIcon },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    shade(): string {
      return `bg-${this.variant}-100 text-${this.variant}-900 border-${this.variant}-50`;
    },
    wrapperColor(): string {
      return this.shade;
    },
    svgColor(): string {
      return `text-${this.variant}-500`;
    },
  },
  methods: {
    closeAlert(): void {
      this.show = false;
      this.$emit("closeClick", true);
    },
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      },
    },
  },
});
</script>
