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
        height="100"
        src="//jsfiddle.net/mohstarsos1/13xgw0ry/8/embedded/html/dark"
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

export default defineComponent({
  name: "App",
  components: {
    TTimeline
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      stepper: "",
      stepperItems: [
        {
          label: "1",
          text: "Step1"
        },
        {
          label: "2",
          text: "Step2"
        },
        {
          label: "3",
          text: "Step3"
        }
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
