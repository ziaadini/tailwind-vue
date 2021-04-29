<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Stepper</h3>
    <p class="mb-2">
      The t-stepper component displays progress through numbered steps.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple (Without Clickable items)</h2>
      <p class="mb-2">
        Choose this basic stepper, only for show the items and progress.
      </p>
      <div class="w-full md:w-1/2 mb-5">
        <t-stepper v-model="stepper" :items="stepperItems"></t-stepper>
      </div>

      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/6n09L1me/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Clickable items</h2>
      <p class="mb-2">
        This component used for clickable item to handle levels of progress.
      </p>
      <div class="w-full md:w-1/2 mb-5">
        <t-stepper
          v-model="stepper2"
          :items="stepperItems"
          clickable
        ></t-stepper>
      </div>

      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/cubhnaLm/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Locked item</h2>
      <p class="mb-2">One or more item can be locked and not clickable.</p>
      <div class="w-full md:w-1/2 mb-5">
        <t-stepper
          v-model="stepper3"
          :items="stepperItems2"
          clickable
        ></t-stepper>
      </div>

      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/ncumg2kq/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Custom Appearance</h2>
      <p class="mb-2">Change title and color each items.</p>
      <div class="w-full md:w-1/2 mb-5">
        <t-stepper v-model="stepper4" :items="stepperItems3" clickable>
          <template #label="{isComplete,isActive}">
            <div v-if="isComplete" class="mt-1 mr-1">
              <t-icon name="check"></t-icon>
            </div>
            <div v-else-if="isActive">
              <div class="w-4 h-4 bg-green-400 rounded-full"></div>
            </div>
            <div v-else class="mt-1 mr-1">
              <t-icon name="lock"></t-icon>
            </div>
          </template>
        </t-stepper>
      </div>

      <iframe
        width="100%"
        height="310"
        src="//jsfiddle.net/mohstarsos1/8d1f5x3m/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div class="mt-10 border rounded-sm p-3 w-full shadow-md">
      <article class="prose prose-xl text-left">
        <vue3-markdown-it :source="mdFile" />
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TStepper from "@/components/tailwind/stepper/TStepper.vue";
import TIcon from "@/components/tailwind/icon/TIcon.vue";

export default defineComponent({
  name: "App",
  components: {
    TStepper,
    TIcon
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      stepper: "",
      stepper2: "",
      stepper3: "",
      stepper4: "",
      stepperItems: [
        { label: "1", text: "Step1" },
        { label: "2", text: "Step2" },
        { label: "3", text: "Step3" }
      ],
      stepperItems2: [
        { label: "1", text: "Step1" },
        { label: "2", text: "Lock", locked: true },
        { label: "3", text: "Step3" }
      ],
      stepperItems3: [
        { label: "X", text: "Step1" },
        { label: "Y", text: "Step2" },
        { label: "Z", text: "Step3" },
        { label: "K", text: "Step4" }
      ]
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/stepper/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
