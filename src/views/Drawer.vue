<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Drawer</h3>
    <p class="mb-2">
      The t-drawer component is what your users will utilize to navigate through
      the application. The drawer is primarily used to house links to the pages
      in your application.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">This is the simplest drawer type.</p>
      <t-drawer teleport-to="#modal-content" v-model="drawer">
        <div>
          This is a test text to show drawer content.
        </div>
      </t-drawer>
      <t-button @click="drawer = true" variant="primary" class="mb-2"
        >Click</t-button
      >
      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/13xgw0ry/8/embedded/html/dark"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">This is the simplest drawer type.</p>
      <t-drawer teleport-to="#modal-content" v-model="drawer2">
        <div>
          This is a test text to show drawer content.
        </div>
      </t-drawer>
      <t-button @click="drawer2 = true" variant="primary" class="mb-2"
        >Click</t-button
      >
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
import TDrawer from "@/components/tailwind/drawer/TDrawer.vue";
import TButton from "@/components/tailwind/button/TButton.vue";

export default defineComponent({
  name: "App",
  components: {
    TButton,
    TDrawer
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      drawer: false,
      drawer2: false
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/drawer/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
