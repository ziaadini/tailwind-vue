<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Timeline</h3>
    <p class="mb-2">
      The t-timeline is useful for stylistically displaying chronological
      information.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple (Without Clickable items)</h2>
      <p class="mb-2">
        Choose this basic timeline, only for show the items and progress.
      </p>
      <t-timeline v-model="stepper" :items="stepperItems"></t-timeline>
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/nerj8ctz/2/embedded/html,js/dark/"
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
      <t-timeline
        clickable
        v-model="stepper2"
        :items="stepperItems"
      ></t-timeline>
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/8g6wcaxy/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Locked item</h2>
      <p class="mb-2">
        One or more item can be locked and not clickable.
      </p>
      <t-timeline
        clickable
        v-model="stepper3"
        :items="stepperItems2"
      ></t-timeline>
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/e35dqhgf/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Custom Appearance</h2>
      <p class="mb-2">
        Change title and color each items.
      </p>
      <t-timeline clickable v-model="stepper4" :items="stepperItems3">
        <template #label="{isComplete,isActive}">
          <div v-if="isComplete">
            <t-icon name="check"></t-icon>
          </div>
          <div v-else-if="isActive">
            <div class="w-4 h-4 bg-green-400 rounded-full"></div>
          </div>
          <div v-else>
            <t-icon name="lock"></t-icon>
          </div>
        </template>
      </t-timeline>
      <iframe
        width="100%"
        height="310"
        src="//jsfiddle.net/mohstarsos1/8m1ajg93/2/embedded/html,js/dark/"
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
import TTimeline from "@/components/tailwind/timeline/TTimeline.vue";
import TIcon from "@/components/tailwind/icon/TIcon.vue";

export default defineComponent({
  name: "App",
  components: {
    TTimeline,
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
    this.mdFile = await fetch("/tailwind/timeline/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
