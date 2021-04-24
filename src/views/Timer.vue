<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Timer</h3>
    <p class="mb-2">
      Small filled buttons in different styles and colors can be used for call
      to actions in forms and more.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <t-count-down-timer v-model="timer"></t-count-down-timer>
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
import TCountDownTimer from "@/components/tailwind/timer/TCountDownTimer.vue";

export default defineComponent({
  name: "App",
  components: {
    TCountDownTimer
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      timer: 60 * 60 * 24 + 4
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/timer/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
