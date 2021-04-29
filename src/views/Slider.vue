<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Slider</h3>
    <p class="mb-2">
      A component for view cards like carousel.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">Standard Slider</p>
      <t-slider class="mb-4">
        <div
          v-for="i in count"
          :key="i"
          class=" rounded w-32 h-56 mx-2 bg-primary-50 inline-block"
        >
          <span class="text-center">{{ i }}</span>
        </div>

        <template #leftButton="{scrollLeft, leftDisabled}">
          <t-button
            variant="primary"
            @click="scrollLeft"
            :disabled="leftDisabled"
          >
            left
          </t-button>
        </template>

        <template #rightButton="{scrollRight, rightDisabled}">
          <t-button
            variant="success"
            @click="scrollRight"
            :disabled="rightDisabled"
          >
            right
          </t-button>
        </template>
      </t-slider>
      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/dnm2tvjr/3/embedded/html,js/dark/"
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
import TSlider from "@/components/tailwind/slider/TSlider.vue";
import TButton from "@/components/tailwind/button/TButton.vue";

export default defineComponent({
  name: "App",
  components: {
    TSlider,
    TButton
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      count: 10
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/slider/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
