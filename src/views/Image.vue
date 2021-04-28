<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Image</h3>
    <p class="mb-2">
      With this component, you can show an image to users.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple (Only Source)</h2>
      <p class="mb-2">Only src prop to show image.</p>
      <t-image :src="imgSource" class="mb-3" />

      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/m7xt0hdg/3/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Lazy Loading</h2>
      <p class="mb-2">
        Use this prop to set lazy load method and increase performance of your
        page.
      </p>
      <t-image :src="imgSource" lazy class="mb-3" />
      <t-image :src="imgSource" lazy class="mb-3" />
      <t-image :src="imgSource" lazy class="mb-3" />
      <t-image :src="imgSource" lazy class="mb-3" />
      <t-image :src="imgSource" lazy class="mb-3" />
      <iframe
        width="100%"
        height="160"
        src="//jsfiddle.net/mohstarsos1/5zru1ame/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Default Image</h2>
      <p class="mb-2">
        When src image not accessible, load and view default image to user.
      </p>
      <t-image :src="imgSource2" :default="defaultImage" lazy class="mb-3" />
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/a52otxb4/1/embedded/html,js/dark/"
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
import TImage from "@/components/tailwind/image/TImage.vue";

export default defineComponent({
  name: "App",
  components: {
    TImage
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      imgSource: "https://picsum.photos/800/600",
      defaultImage: "https://picsum.photos/seed/picsum/800/600"
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/image/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
