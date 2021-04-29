<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Animate</h3>
    <p class="mb-2">
      Small filled buttons in different styles and colors can be used for call
      to actions in forms and more.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        You can animate the element from start to end point with v-model.
      </p>
      <t-animate
        class="transform"
        start="translate-x-1/2 opacity-1"
        end="translate-y-full opacity-0"
        :show="animate"
        allocate-space
        :duration="200"
      >
        <div class="w-10 h-10 rounded-full bg-warning"></div>
      </t-animate>
      <t-button variant="primary" @click="animate = !animate" class="mb-2"
        >Click to Animate</t-button
      >
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/zo7snt8w/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Duration</h2>
      <p class="mb-2">Set a duration prop to declaration of animating.</p>
      <t-animate
        class="transform"
        start="translate-x-1/2 opacity-1"
        end="translate-y-full opacity-0"
        :duration="1000"
        :show="animate2"
        allocate-space
      >
        <div class="w-10 h-10 rounded-full bg-warning"></div>
      </t-animate>
      <t-button variant="primary" @click="animate2 = !animate2" class="mb-2"
        >Click to Animate</t-button
      >
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/jLmkn1o7/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Allocate Space</h2>
      <p class="mb-2">
        Assign space for start to end animated elements.
      </p>
      <t-animate
        class="transform"
        start="translate-x-1/2 opacity-1"
        end="translate-y-full opacity-0"
        :show="animate"
        :allocate-space="false"
        :duration="200"
      >
        <div class="w-10 h-10 rounded-full bg-warning"></div>
      </t-animate>
      <t-button variant="primary" @click="animate = !animate" class="mb-2"
        >Click to Animate</t-button
      >
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/us7v0tem/1/embedded/html,js/dark/"
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
import TButton from "@/components/tailwind/button/TButton.vue";
import TAnimate from "@/components/tailwind/animate/TAnimate.vue";

export default defineComponent({
  name: "App",
  components: {
    TButton,
    TAnimate
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      animate: false,
      animate2: false
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/animate/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
