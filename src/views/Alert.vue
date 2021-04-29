<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Alert</h3>
    <p class="mb-2">
      The t-alert component is used to convey important information to the user
      through the use contextual types icons and color. These default types come
      in in 4 variations: primary, success, warning, and error.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple (Only Text)</h2>
      <p class="mb-2">Basic alert, only with text.</p>
      <t-alert show class="w-full">
        This is a single line message...
      </t-alert>
      <t-alert show class="w-full">
        This is a multi line message This is a multi line message This is a
        multi line message This is a multi line message This is a multi line
        message This is a multi line message This is a multi line message This
        is a multi line message This is a multi line message This is a multi
        line message This is a multi line message This is a multi line message
        This is a multi line message This is a multi line message This is a
        multi line message This is a multi line message This is a multi line
        message This is a multi line message This is a multi line message This
        is a multi line message This is a multi line message This is a multi
        line message This is a multi line message This is a multi line message
        This is a multi line message...
      </t-alert>
      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/s2xt5p0d/4/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple (with variant colors)</h2>
      <p class="mb-2">Basic alert, with default variant colors.</p>
      <t-alert show variant="primary" class="w-full">
        This is a PRIMARY VARIANT ALERT message...
      </t-alert>
      <t-alert show variant="success" class="w-full">
        This is a SUCCESS VARIANT ALERT message...
      </t-alert>
      <t-alert show variant="warning" class="w-full">
        This is a WARNING VARIANT ALERT message...
      </t-alert>
      <t-alert show variant="danger" class="w-full">
        This is a DANGER VARIANT ALERT message...
      </t-alert>
      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/71tvkgsp/2/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Icon and Closeable</h2>
      <p class="mb-2">
        Choose this alert, with icon and close button to disapear.
      </p>
      <t-alert show icon="home" class="w-full">
        This is a message with icon...
      </t-alert>
      <t-alert v-model="showAlert" variant="danger" class="w-full">
        This is a closeable alert message...
      </t-alert>
      <t-alert
        v-model="showAlert2"
        icon="home"
        variant="success"
        class="w-full"
      >
        This is a closeable with icon alert message...
      </t-alert>
      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/d1h07mkp/4/embedded/html,js/dark/"
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
import TAlert from "@/components/tailwind/alert/TAlert.vue";

export default defineComponent({
  name: "App",
  components: {
    TAlert
  },
  setup() {
    return {};
  },
  data() {
    return {
      showAlert: true,
      showAlert2: true,
      mdFile: ""
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/alert/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
