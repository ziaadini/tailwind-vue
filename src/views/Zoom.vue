<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Zoom</h3>
    <p class="mb-2">
      This compnent design for zoom on image with mouse hover with 4 scale type
      (1.5, 2, 3, 4).
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        Define a image source and hover your mouse to view zoom.
      </p>
      <TZoom src="https://picsum.photos/800/600" class="mb-3"></TZoom>
      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/e1u89tf6/1/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Scale</h2>
      <p class="mb-2">
        You can set this prop for scaling hovered image.
      </p>
      <div class="mt-8">Default Scale (1.5)</div>
      <TZoom src="https://picsum.photos/800/600"></TZoom>
      <div class="mt-8">Scale 2</div>
      <TZoom src="https://picsum.photos/800/600" :scale="2"></TZoom>
      <div class="mt-8">Scale 3</div>
      <TZoom src="https://picsum.photos/800/600" :scale="3"></TZoom>
      <div class="mt-8">Scale 4</div>
      <TZoom
        src="https://picsum.photos/800/600"
        :scale="4"
        class="mb-3"
      ></TZoom>
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/qfc2ex64/1/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Mask Image</h2>
      <p class="mb-2">
        Define another image source for show when not hovered via cursor.
      </p>
      <TZoom
        src="https://picsum.photos/800/600"
        maskSrc="https://picsum.photos/seed/picsum/800/600"
        :scale="4"
        class="mb-3"
      ></TZoom>
      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/h2t4y1pj/embedded/html/dark/"
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
import TZoom from "@/components/tailwind/zoom/TZoom.vue";

export default defineComponent({
  name: "App",
  components: {
    TZoom
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
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/zoom/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
