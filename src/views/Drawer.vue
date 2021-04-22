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
        >Open Drawer</t-button
      >
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/d3gkaxbp/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Position Left</h2>
      <p class="mb-2">
        Used this prop to open drawer from left of your screen.
      </p>
      <t-drawer teleport-to="#modal-content" v-model="drawer2">
        <!-- left true -->
        <div>
          This is a test text to show drawer content.
        </div>
      </t-drawer>
      <t-button @click="drawer2 = true" variant="primary" class="mb-2"
        >Open Drawer</t-button
      >
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/pdmfc6jb/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Full Size</h2>
      <p class="mb-2">
        Used this prop to open drawer and place on full size of your screen.
      </p>
      <t-drawer :full="true" teleport-to="#modal-content" v-model="drawer3">
        <div>
          This is a test text to show drawer content.
        </div>
      </t-drawer>
      <t-button @click="drawer3 = true" variant="primary" class="mb-2"
        >Open Drawer</t-button
      >
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/fu5omkrz/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Close Button</h2>
      <p class="mb-2">When this prop used, drawer has not btn for closed.</p>
      <t-drawer
        :hasCloseButton="false"
        teleport-to="#modal-content"
        v-model="drawer4"
      >
        <div>
          This is a test text to show drawer content.
        </div>
      </t-drawer>
      <t-button @click="drawer4 = true" variant="primary" class="mb-2"
        >Open Drawer</t-button
      >
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/u4gvnx9h/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Back Drop</h2>
      <p class="mb-2 text-left">
        When this prop set false, drawer backdrop and overlay outside of drawer
        body is disabled. <br />
        <span class="font-bold"
          >notice: when backDrop is false, darwer close only with scape key on
          keyboard or close button in drawer body.</span
        >
      </p>
      <t-drawer
        :backDrop="false"
        teleport-to="#modal-content"
        v-model="drawer5"
      >
        <div>
          This is a test text to show drawer content.
        </div>
      </t-drawer>
      <t-button @click="drawer5 = true" variant="primary" class="mb-2"
        >Open Drawer</t-button
      >
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/0wpnqe3z/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Title</h2>
      <p class="mb-2">This prop add a title to top of darwer body.</p>
      <t-drawer
        title="This is a title test"
        teleport-to="#modal-content"
        v-model="drawer6"
      >
        <div>
          This is a test text to show drawer content.
        </div>
      </t-drawer>
      <t-button @click="drawer6 = true" variant="primary" class="mb-2"
        >Open Drawer</t-button
      >
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/syng7d1p/1/embedded/html,js/dark/"
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
      drawer2: false,
      drawer3: false,
      drawer4: false,
      drawer5: false,
      drawer6: false
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
