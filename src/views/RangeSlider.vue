<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Range Slider</h3>
    <p class="mb-2">
      The t-range-slider component is a better visualization of the number
      input. It is used for gathering numerical user data.Sliders reflect a
      range of values along a bar, from which users may select a single value.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        Choose this basic type of component to select a single value.
      </p>
      <t-range-slider
        :min="0"
        :max="10000"
        v-model:max-value="rangeMax"
        v-model:min-value="rangeMin"
        class="my-5 mx-3"
      ></t-range-slider>
      <div>Range Minimum: {{ ~~rangeMin }}</div>
      <div>Range Maximum: {{ ~~rangeMax }}</div>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/2765yv3r/5/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Disable Minimum</h2>
      <p class="mb-2">You can disable the minimum value.</p>
      <t-range-slider
        :disableMin="true"
        :min="0"
        :max="10000"
        v-model:max-value="rangeMax2"
        v-model:min-value="rangeMin2"
        class="my-5 mx-3"
      ></t-range-slider>
      <div>Range Minimum: {{ ~~rangeMin2 }}</div>
      <div>Range Maximum: {{ ~~rangeMax2 }}</div>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/6xry5ujk/5/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Disable Maximum</h2>
      <p class="mb-2">You can disable the maximum value.</p>
      <t-range-slider
        :disableMax="true"
        :min="0"
        :max="10000"
        v-model:max-value="rangeMax3"
        v-model:min-value="rangeMin3"
        class="my-5 mx-3"
      ></t-range-slider>
      <div>Range Minimum: {{ ~~rangeMin3 }}</div>
      <div>Range Maximum: {{ ~~rangeMax3 }}</div>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/rpu2dca0/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Varinat Color</h2>
      <p class="mb-2">
        You can use the default variant color to set this component.
      </p>
      <t-range-slider
        variant="primary"
        :min="0"
        :max="10000"
        v-model:max-value="rangeMax4"
        v-model:min-value="rangeMin4"
        class="my-5 mx-3"
      ></t-range-slider>
      <t-range-slider
        variant="success"
        :min="0"
        :max="10000"
        v-model:max-value="rangeMax4"
        v-model:min-value="rangeMin4"
        class="my-5 mx-3"
      ></t-range-slider>
      <t-range-slider
        variant="warning"
        :min="0"
        :max="10000"
        v-model:max-value="rangeMax4"
        v-model:min-value="rangeMin4"
        class="my-5 mx-3"
      ></t-range-slider>
      <t-range-slider
        variant="danger"
        :min="0"
        :max="10000"
        v-model:max-value="rangeMax4"
        v-model:min-value="rangeMin4"
        class="my-5 mx-3"
      ></t-range-slider>
      <div>Range Minimum: {{ ~~rangeMin4 }}</div>
      <div>Range Maximum: {{ ~~rangeMax4 }}</div>
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/hLoya0wn/1/embedded/html,js/dark/"
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
import TRangeSlider from "@/components/tailwind/rangeSlider/TRangeSlider.vue";

export default defineComponent({
  name: "App",
  components: {
    TRangeSlider
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      rangeMax: 8000,
      rangeMin: 2000,
      rangeMax2: 8000,
      rangeMin2: 0,
      rangeMax3: 10000,
      rangeMin3: 2000,
      rangeMax4: 8000,
      rangeMin4: 2000
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/rangeSlider/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
