<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Toast</h3>
    <p class="mb-2">
      Toast in their simplest form are a flat sheets of paper that display a
      message.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <t-toast v-model="toast">
        This is a test text for simple Toast component's body.
      </t-toast>
      <t-button @click="toast = true" variant="success" class="mb-2"
        >View Toast</t-button
      >
      <iframe
        width="100%"
        height="160"
        src="//jsfiddle.net/mohstarsos1/3wc1s2o8/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Duration</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <t-toast :duration="6000" v-model="toast2">
        This is a test text for 6 seconds view Toast component's body.
      </t-toast>
      <t-button @click="toast2 = true" variant="success" class="mb-2"
        >View Toast</t-button
      >
      <iframe
        width="100%"
        height="160"
        src="//jsfiddle.net/mohstarsos1/xbmg0yoq/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Variant Colors</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <t-toast variant="primary" v-model="toast3">
        This is a test text for primary Toast component's bg body.
      </t-toast>
      <t-button @click="toast3 = true" variant="primary" class="mb-2"
        >View Primary Toast</t-button
      >
      <t-toast variant="success" v-model="toast4">
        This is a test text for success Toast component's bg body.
      </t-toast>
      <t-button @click="toast4 = true" variant="success" class="mb-2"
        >View Success Toast</t-button
      >
      <t-toast variant="warning" v-model="toast5">
        This is a test text for warning Toast component's bg body.
      </t-toast>
      <t-button @click="toast5 = true" variant="warning" class="mb-2"
        >View Warning Toast</t-button
      >
      <t-toast variant="danger" v-model="toast6">
        This is a test text for danger Toast component's bg body.
      </t-toast>
      <t-button @click="toast6 = true" variant="danger" class="mb-2"
        >View Danger Toast</t-button
      >
      <iframe
        width="100%"
        height="500"
        src="//jsfiddle.net/mohstarsos1/ym82gvus/3/embedded/html,js/dark/"
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
import TToast from "@/components/tailwind/toast/TToast.vue";

export default defineComponent({
  name: "App",
  components: {
    TButton,
    TToast
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      toast: false,
      toast2: false,
      toast3: false,
      toast4: false,
      toast5: false,
      toast6: false
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/toast/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
