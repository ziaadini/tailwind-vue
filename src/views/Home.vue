<template>
  <div class="flex justify-center">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  </div>
  <div class="flex items-center flex-col space-y-4">
    <div>
      <div>#Ali</div>
      <t-button variant="warning" icon="accessible" outline disabled>
        some text
      </t-button>
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
import TButton from "@/components/tailwind/TButton.vue";
import TNumberPicker from "@/components/tailwind/numberPicker/TNumberPicker.vue";
import TModal from "@/components/tailwind/modal/TModal.vue";
export default defineComponent({
  name: "App",
  components: {
    TModal,
    TNumberPicker,
    TButton,
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
});
</script>
