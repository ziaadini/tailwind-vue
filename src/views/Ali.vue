<template>
  <div class="flex justify-center">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  </div>
  <div class="flex items-center flex-col space-y-4">
    <div>#Ali</div>
    {{ text }}
    <TextInput
      v-model.format:&:4="text"
      variant="warning"
      outline
      align="right"
      leftIcon="add_task"
      rightIcon="add_task"
      disabled
      rounded
    />
    <t-button variant="primary" icon="accessible">
      some text
    </t-button>
    <t-menu placement="right" full>
      <!-- Button content -->
      <template v-slot:button>
        <t-button class="z-10" variant="primary" full outline icon="accessible">
          test
        </t-button>
      </template>

      <!-- Opened dropdown content -->
      <template v-slot:content>
        <a
          class="flex w-full justify-between items-center rounded px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white"
          href="#"
          >Profile</a
        >
        <a
          class="flex w-full justify-between items-center rounded px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white"
          href="#"
          >Settings</a
        >
        <a
          class="flex w-full justify-between items-center rounded px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white"
          href="#"
          >Help</a
        >

        <hr />

        <a
          class="flex w-full justify-between items-center rounded px-2 py-1 my-1 hover:bg-red-600 hover:text-white"
          href="#"
          >Logout</a
        >
      </template>
    </t-menu>
    <t-alert icon="add_task" variant="primary">
      هشدار هشدار هشدار هشدار هشدار هشدار هشدار هشدار هشدار هشدار هشدار هشدار
    </t-alert>
    <t-breadcrumb v-model="items" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";
import TMenu from "@/components/tailwind/menu/TMenu.vue";
import TAlert from "@/components/tailwind/alert/TAlert.vue";
import TBreadcrumb from "@/components/tailwind/breadcrumb/TBreadcrumb.vue";
import { BreadCrumb } from "@/types/base-component-types";
import TextInput from "@/components/tailwind/text-input/TTextInput.vue";

export default defineComponent({
  name: "App",
  components: {
    TButton,
    TMenu,
    TAlert,
    TBreadcrumb,
    TextInput,
  },
  data() {
    return {
      items: [
        {
          text: "تست۱",
          url: "مقدار ۱",
        },
        {
          text: "تست۲",
          url: "مقدار ۲",
        },
        {
          text: "تست۳",
          url: "مقدار ۳",
          active: true,
        },
      ] as BreadCrumb.Root,
      text: 12223,
    };
  },
  setup() {
    const numberPickerCount = ref<number>(3);
    const modal = ref<boolean>(false);
    const modalCloseCallback = () => {
      console.log("modal has been closed");
      return true;
    };
    return { numberPickerCount, modal, modalCloseCallback };
  },
  mounted() {
    setTimeout(() => {
      this.text = 222222222222;
    }, 4000);
  },
});
</script>
