<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Fade</h3>
    <p class="mb-2">
      Small filled buttons in different styles and colors can be used for call
      to actions in forms and more.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        Choose this basic fade, only with a button to show and hide items.
      </p>
      <t-fade :show="fade">
        <div>
          This is a test text...
        </div>
      </t-fade>
      <t-button @click="fade = !fade" variant="primary" ripple class="mb-3"
        >Click to toggle</t-button
      >
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/0k8a3tc4/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Allocate Space</h2>
      <p class="mb-2">Calculate and allocate space for untoggled items.</p>
      <t-fade allocateSpace :show="fade2">
        <div>
          This is a test text...
        </div>
      </t-fade>
      <t-button @click="fade2 = !fade2" variant="primary" ripple class="mb-3"
        >Click to toggle</t-button
      >
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/1x4ftner/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Custom Duration</h2>
      <p class="mb-2">Set a duration to show and hide items.</p>
      <t-fade :duration="1000" :show="fade3">
        <div>
          This is a test text...
        </div>
      </t-fade>
      <t-button @click="fade3 = !fade3" variant="primary" ripple class="mb-3"
        >Click to toggle</t-button
      >
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/towumLbh/1/embedded/html,js/dark/"
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
import TFade from "@/components/tailwind/fade/TFade.vue";
import TButton from "@/components/tailwind/button/TButton.vue";

export default defineComponent({
  name: "App",
  components: {
    TFade,
    TButton
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      fade: false,
      fade2: false,
      fade3: false
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/fade/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
