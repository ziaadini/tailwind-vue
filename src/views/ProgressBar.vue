<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">ProgressBar</h3>
    <p class="mb-2">
      The t-progress-bar component is used to convey data visually to users.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        In its simplest form, t-progress-bar displays a horizontal progress bar.
      </p>
      <div class="w-60">
        <t-progress-bar :value="30" class="mb-3"></t-progress-bar>
      </div>

      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/L93yoabt/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Show Percentage</h2>
      <p class="mb-2">This props used to view percent of progress.</p>
      <div class="w-60">
        <t-progress-bar showPercent :value="50" class="mb-3"></t-progress-bar>
      </div>

      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/491rof0x/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Variant Color</h2>
      <p class="mb-2">
        You can also set the color using the default variant color.
      </p>
      <div class="flex">
        <div class="w-60 mr-5">
          <t-progress-bar
            variant="primary"
            showPercent
            :value="25"
            class="mb-3"
          ></t-progress-bar>
          <t-progress-bar
            variant="success"
            showPercent
            :value="50"
            class="mb-3"
          ></t-progress-bar>
          <t-progress-bar
            variant="warning"
            showPercent
            :value="75"
            class="mb-3"
          ></t-progress-bar>
          <t-progress-bar
            variant="danger"
            showPercent
            :value="100"
            class="mb-3"
          ></t-progress-bar>
        </div>
        <div class="w-60">
          <t-progress-bar
            variant="primary"
            :value="25"
            class="mb-3"
          ></t-progress-bar>
          <t-progress-bar
            variant="success"
            :value="50"
            class="mb-3"
          ></t-progress-bar>
          <t-progress-bar
            variant="warning"
            :value="75"
            class="mb-3"
          ></t-progress-bar>
          <t-progress-bar
            variant="danger"
            :value="100"
            class="mb-3"
          ></t-progress-bar>
        </div>
      </div>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/u8nfv6m0/1/embedded/html/dark/"
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
import TProgressBar from "@/components/tailwind/progress/TProgressBar.vue";

export default defineComponent({
  name: "App",
  components: {
    TProgressBar
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: ""
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/progress/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
