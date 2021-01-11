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
      <t-number-picker
        :max="5"
        :min="2"
        v-model="numberPickerCount"
      ></t-number-picker>
    </div>
    <div>
      <div>#zia</div>
      <t-modal
        teleport-to="#modal-content"
        v-model="modal"
        :close-callback="modalCloseCallback"
      >
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

    <div>
      <div>#zia</div>
      <t-drawer teleport-to="#modal-content" v-model="drawer">
        <!--        <template #closeButton="attrs">-->
        <!--          <t-button v-bind="attrs">close</t-button>-->
        <!--        </template>-->
        <div>
          <div class="h-96">hi</div>
          <div class="h-96">bye</div>
          <div class="h-96">تست</div>
          <div class="h-90 text-gray-800 bg-gray-300">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است.
          </div>
        </div>
      </t-drawer>
      <t-button @click="drawer = true" variant="success">open drawer</t-button>
    </div>

    <div>
      <div>#zia</div>
      <t-bottom-sheet
        class="rounded-t-md"
        title=" تایتل"
        teleport-to="#modal-content"
        v-model="bottomSheet"
      >
        <!--        <template #closeButton="attrs">-->
        <!--          <t-button v-bind="attrs">close</t-button>-->
        <!--        </template>-->
        <div>
          <div class="h-96">hi</div>
          <div class="h-96">bye</div>
          <div class="h-96">تست</div>
          <div class="h-90 text-gray-800 bg-gray-300">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است.
          </div>
        </div>
      </t-bottom-sheet>
      <t-button @click="bottomSheet = true" variant="warning"
        >open bottomSheet</t-button
      >
    </div>

    <div>
      <div>#zia</div>
      <t-switch
        v-model="switchModel"
        :true-value="1"
        :false-value="0"
        label="فقط کالاهای موجود"
      ></t-switch>

      <!--      <t-switch-->
      <!--        v-model="switchModel"-->
      <!--        :value="[{ a: 1 }]"-->
      <!--        label="فقط کالاهای موجود"-->
      <!--      ></t-switch>-->
      <!--      <t-switch-->
      <!--        v-model="switchModel"-->
      <!--        :value="{ a: 2 }"-->
      <!--        label="فقط کالاهای موجود"-->
      <!--      ></t-switch>-->
    </div>

    <div>
      <div>#zia</div>
      <t-checkbox
        v-model="checkboxModel"
        :true-value="1"
        :false-value="0"
        label="سامسونگ"
      ></t-checkbox>

      <t-checkbox v-model="checkboxModel" :true-value="1" :false-value="0">
        <template #label>
          <div class="mr-2">my custom label</div>
        </template>
      </t-checkbox>
    </div>
    <div class="w-full">
      <div>#zia</div>
      <t-skeleton type="card" class="max-w-sm"> </t-skeleton>
    </div>

    <div>
      <div>#zia</div>
      <t-loading></t-loading>
    </div>

    <div>
      <div>#zia</div>
      <div class="flex w-full space-x-reverse space-x-3 mt-4">
        <t-radio
          label="تست ۱"
          variant="danger"
          v-model="radioModel"
          value="test1"
        ></t-radio>
        <t-radio
          label="تست ۲"
          variant="danger"
          v-model="radioModel"
          :value="{ a: 'test2' }"
        ></t-radio>
      </div>
      <h3 class="mt-8 mb-2">custom radio</h3>
      <div class="flex w-full space-x-reverse space-x-3 mb-4">
        <t-radio
          variant="danger"
          v-model="radioModel2"
          value="test1"
          hide-input
        >
          <template #label="{isChecked}">
            <div
              class="px-4 py-2 border-2 rounded-xs"
              :class="{ 'border-success': isChecked }"
            >
              تست ۱
            </div>
          </template>
        </t-radio>
        <t-radio
          variant="danger"
          v-model="radioModel2"
          :value="{ a: 'test2' }"
          active-class="border-primary"
          class="px-4 py-2 border-2 rounded-xs"
        >
          <template #label>
            <div class="mr-2">
              تست ۲
            </div>
          </template>
        </t-radio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";
import TModal from "@/components/tailwind/modal/TModal.vue";
import { ref, watchEffect } from "vue";
import TNumberPicker from "@/components/tailwind/numberPicker/TNumberPicker.vue";
import TSwitch from "@/components/tailwind/switch/TSwitch.vue";
import TCheckbox from "@/components/tailwind/checkbox/TCheckbox.vue";
import TSkeleton from "@/components/tailwind/skeleton/TSkeleton.vue";
import TRadio from "@/components/tailwind/radio/TRadio.vue";

import TDrawer from "@/components/tailwind/drawer/TDrawer.vue";
import TLoading from "@/components/tailwind/loading/TLoading.vue";
import TBottomSheet from "@/components/tailwind/bottomSheet/TBottomSheet.vue";
export default defineComponent({
  name: "App",
  components: {
    TBottomSheet,
    TLoading,
    TDrawer,
    TRadio,
    TSkeleton,
    TCheckbox,
    TSwitch,
    TModal,
    TNumberPicker,
    TButton
  },
  setup() {
    const numberPickerCount = ref<number>(3);
    const switchModel = ref("");
    const checkboxModel = ref("");
    const radioModel = ref<Record<string, any> | string>("");
    const radioModel2 = ref<Record<string, any> | string>("");
    const modal = ref<boolean>(false);
    const drawer = ref<boolean>(false);
    const bottomSheet = ref<boolean>(false);
    const modalCloseCallback = () => {
      console.log("modal has been closed");
      return true;
    };
    watchEffect(() => {
      console.log("switchModel", switchModel.value);
      console.log("checkboxModel", checkboxModel.value);
    });
    watchEffect(() => {
      console.log("radioModel is : ", radioModel.value);
    });
    return {
      numberPickerCount,
      switchModel,
      modal,
      drawer,
      modalCloseCallback,
      checkboxModel,
      radioModel,
      radioModel2,
      bottomSheet
    };
  }
});
</script>
