<template>
  <t-fade :show="showAlert" :allocate-space="allocateSpace">
    <div
      data-name="alert-container"
      :class="[
        renderClass(
          `${wrapperColor} my-4 shadow-sm border-r-4 rounded-sm transition-opacity duration-500`,
          'container'
        )
      ]"
      role="alert"
    >
      <div
        data-name="alert-innerContainer"
        :class="
          renderClass(
            'flex items-center justify-between px-3 py-3',
            'innerContainer'
          )
        "
      >
        <div
          data-name="alert-wrapper"
          :class="renderClass('flex items-center', 'wrapper')"
        >
          <div class="self-start" v-if="hasIconSlot">
            <slot name="icon"></slot>
          </div>
          <div class="self-start" v-else-if="icon">
            <t-icon
              data-name="alert-icon"
              :class="renderClass(iconClass, 'icon')"
              :name="icon"
            ></t-icon>
          </div>

          <div
            data-name="alert-text"
            :class="renderClass('text-sm text-right', 'text')"
          >
            <slot></slot>
          </div>
        </div>

        <template v-if="!show">
          <div
            @click="closeAlert"
            data-name="alert-close"
            :class="
              renderClass(`cursor-pointer self-start fill-current `, 'close')
            "
            name="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
            >
              <path
                d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
              />
            </svg>
          </div>
        </template>

        <!--      </div>-->
      </div>
    </div>
  </t-fade>
</template>

<script lang="ts">
import TIcon from "@/components/tailwind/icon/TIcon.vue";
import { variants } from "@/utility/css-helper";
import { computed, defineComponent } from "vue";
import { useRenderClass } from "@/compositionFunctions/settings";
import TFade from "@/components/tailwind/fade/TFade.vue";

export default defineComponent({
  components: { TFade, TIcon },
  emits: ["update:modelValue"],
  props: {
    icon: {
      required: false,
      default: "",
      type: String
    },
    iconClass: { type: String, default: "" },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        return !!variants[propValue];
      }
    },
    modelValue: {
      type: [Number, Boolean],
      default: 0
    },
    show: {
      type: [Number, Boolean],
      default: 0
    },
    allocateSpace: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, { emit, slots }) {
    const wrapperColor = computed(() => {
      return `bg-${props.variant}-50 text-${props.variant} border-${props.variant}-50`;
    });
    const svgColor = () => {
      return `text-${props.variant}-500`;
    };

    const closeAlert = () => {
      emit("update:modelValue", false);
    };
    const showAlert = computed(() => {
      return props.modelValue || props.show;
    });
    const { renderClass } = useRenderClass("alert");
    return {
      hasIconSlot: slots.icon,
      renderClass,
      wrapperColor,
      svgColor,
      closeAlert,
      showAlert
    };
  }
});
</script>
