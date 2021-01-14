<template>
  <div class="relative">
    <div
      class="cursor-pointer w-64 h-10 flex items-center justify-center"
      :class="{
        'rounded-full': rounded && !open,
        'rounded-md': rounded && open,
        'rounded-b-none': rounded && open,
        [parentClass]: true,
      }"
      @click="open = !open"
    >
      {{ selected?.label || placeholder }}
    </div>
    <div
      v-show="open"
      :class="{ 'opacity-0': !open, 'rounded-b-md': rounded }"
      class="duration-500 ease-in-out cursor-pointer transition w-64 absolute z-20 bg-white shadow"
    >
      <template v-for="(item, index) in getItems" :key="index">
        <div
          class="py-2"
          :class="{
            [childClass]: true,
            'rounded-b-md': index + 1 === items.length && rounded,
          }"
        >
          {{ item.label }}
        </div>
        <hr v-if="getItems.length !== index + 1" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { variants } from "@/utility/css-helper";
import { defineComponent, PropType } from "vue";
import { DropDown } from "@/types/base-component-types";
export default defineComponent({
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      },
    },
    modelValue: {
      type: String,
      required: true,
    },
    outline: {
      type: Boolean,
      default: false,
      required: false,
    },
    placeholder: {
      type: String,
      default: "",
      required: false,
    },
    rounded: {
      type: Boolean,
      default: false,
      required: false,
    },
    items: {
      default: [],
      type: Array as PropType<DropDown.Root>,
    },
  },
  data() {
    return {
      open: false,
      selected: null,
    };
  },
  setup(props) {
    const baseClass = `bg-${props.variant} text-white hover:opacity-80 transition`;
    const outlineClass = `border-${props.variant} hover:bg-${props.variant}-50 hover:shadow`;
    const childClass = `bg-${props.variant}-100 hover:bg-${props.variant}-200 hover:text-white focus:border-${props.variant} transition`;

    const itemFactory = (items: DropDown.Root) => {
      if (!items || items.length === 0) return [];

      const newItems = [] as DropDown.ObjectForm[];
      const type = typeof items[0];

      if (type === "string") {
        (items as DropDown.stringForm).forEach((item) => {
          newItems.push({
            label: item,
            value: item,
          });
        });

        return newItems;
      }

      return newItems;
    };


    return {
      parentClass: props.outline ? outlineClass : baseClass,
      childClass,
      getItems: itemFactory(props.items),
    };
  },
  methods: {
    selectItem(item: any): void {
      this.selected = item;
      this.open = !this.open;
    },
  },
});
</script>
