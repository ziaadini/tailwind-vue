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
      <div class="flex items-center justify-between px-3 py-3">
        <div class="flex items-center">
          <div class="self-start" v-if="icon">
            <t-icon
              data-name="alert-icon"
              :class="renderClass(iconClass, 'icon')"
              :name="icon"
            ></t-icon>
          </div>

          <div>
            <div class="text-sm text-right">
              <slot></slot>
            </div>
          </div>
        </div>

        <template v-if="!show">
          <t-icon
            @click="closeAlert"
            data-name="alert-close"
            :class="
              renderClass(
                'text-3xl cursor-pointer self-start leading-8',
                'close'
              )
            "
            name="close"
          >
          </t-icon>
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
  setup(props, { emit }) {
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
      renderClass,
      wrapperColor,
      svgColor,
      closeAlert,
      showAlert
    };
  }
});
</script>
