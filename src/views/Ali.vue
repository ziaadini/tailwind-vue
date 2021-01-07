<template>
  <div class="flex justify-center">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  </div>
  <div class="flex items-center flex-col space-y-4">
    <div>
      <div>#Ali</div>
      <t-button variant="primary" outline icon="accessible" disabled>
        some text
      </t-button>
      <t-dropdown class="mt-3" placement="right">
        <!-- Button content -->
        <template v-slot:button>
          <div class="hover:ring-4 shadow transition rounded px-1 py-2 w-full">
            <span class="inline-block">Test</span>

            <svg
              class="w-4 h-4 inline-block mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"
              />
            </svg>
          </div>
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
      </t-dropdown>
      <t-alert variant="warning">
        هشدار هشدار هشدار هشدار هشدار هشدار هشدار هشدار هشدار هشدار هشدار هشدار
      </t-alert>
      <t-breadcrumb v-model="items" />
    </div>
    <div>
      <div>#zia</div>
      <t-number-picker :max="5" v-model="numberPickerCount"></t-number-picker>
    </div>
    <div>
      <div>#zia</div>
      <t-modal v-model="modal" :close-callback="modalCloseCallback">
        <!--        <template #closeButton="attrs">-->
        <!--          <t-button v-bind="attrs">close</t-button>-->
        <!--        </template>-->
        <p class="text-gray-800">
          Are you sure you want you delete your account? This action cannot be
          undone.
        </p>

        <div class="text-right mt-4">
          <button
            @click="modal = false"
            class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline"
          >
            Cancel
          </button>
          <button
            class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </t-modal>
      <t-button @click="modal = true">open modal</t-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
<<<<<<< HEAD
import TButton from "@/components/button/TButton.vue";
import TNumberPicker from "@/components/numberPicker/TNumberPicker.vue";
import TModal from "@/components/modal/TModal.vue";
import TDropdown from "@/components/dropdown/TDropdown.vue";
import TAlert from "@/components/alert/TAlert.vue";
import TBreadcrumb from "@/components/breadcrumb/TBreadcrumb.vue";
=======
import TButton from "@/components/tailwind/TButton.vue";
import TNumberPicker from "@/components/tailwind/numberPicker/TNumberPicker.vue";
import TModal from "@/components/tailwind/modal/TModal.vue";
import TDropdown from "@/components/tailwind/dropdown/TDropdown.vue";
import TAlert from "@/components/tailwind/alert/TAlert.vue";
import TBreadcrumb from "@/components/tailwind/breadcrumb/TBreadcrumb.vue";
>>>>>>> master
import { BreadCrumb } from "@/types/base-component-types";

export default defineComponent({
  name: "App",
  components: {
    TModal,
    TNumberPicker,
    TButton,
    TDropdown,
    TAlert,
    TBreadcrumb
  },
  data() {
    return {
      items: [
        {
          text: "تست۱",
          url: "مقدار ۱"
        },
        {
          text: "تست۲",
          url: "مقدار ۲"
        },
        {
          text: "تست۳",
          url: "مقدار ۳",
          active: true
        }
      ] as BreadCrumb.Root
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
  }
});
</script>
