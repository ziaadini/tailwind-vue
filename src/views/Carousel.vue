<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Carousel</h3>
    <p class="mb-2">
      A slideshow component for cycling through elements—images or slides of
      text—like a carousel.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">Here’s a carousel with slides only.</p>

      <t-carousel
        :autoPlay="false"
        v-model="itemChange"
        :items="links"
        class="w-96 h-96"
        style="margin: 0 auto;"
      >
        <!-- <t-button variant="primary" :key="i"> test</t-button> -->

        <template #leftButton="{leftDisabled, back}">
          <t-button variant="primary" :disabled="leftDisabled" @click="back">
            -</t-button
          >
        </template>

        <template #rightButton="{rightDisabled, next}">
          <t-button variant="primary" :disabled="rightDisabled" @click="next">
            +</t-button
          >
        </template>
      </t-carousel>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/nrpe3x7o/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Auto Play</h2>
      <p class="mb-2">Here’s a carousel with autoplay ability.</p>

      <t-carousel
        autoPlay
        v-model="itemChange2"
        :items="links"
        class="w-96 h-96"
        style="margin: 0 auto;"
      >
        <!-- <t-button variant="primary" :key="i"> test</t-button> -->

        <template #leftButton="{leftDisabled, back}">
          <t-button variant="primary" :disabled="leftDisabled" @click="back">
            -</t-button
          >
        </template>

        <template #rightButton="{rightDisabled, next}">
          <t-button variant="primary" :disabled="rightDisabled" @click="next">
            +</t-button
          >
        </template>
      </t-carousel>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/mqvf8er7/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Rotate Effect</h2>
      <p class="mb-2">
        Here’s a carousel with autoplay ability and rotate effect for change
        slides.
      </p>

      <t-carousel
        autoPlay
        rotate
        v-model="itemChange3"
        :items="links"
        class="w-96 h-96"
        style="margin: 0 auto;"
      >
        <!-- <t-button variant="primary" :key="i"> test</t-button> -->

        <template #leftButton="{leftDisabled, back}">
          <t-button variant="primary" :disabled="leftDisabled" @click="back">
            -</t-button
          >
        </template>

        <template #rightButton="{rightDisabled, next}">
          <t-button variant="primary" :disabled="rightDisabled" @click="next">
            +</t-button
          >
        </template>
      </t-carousel>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/45yu37c0/1/embedded/html,js/dark/"
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
import TCarousel from "@/components/tailwind/carousel/TCarousel.vue";
import TButton from "@/components/tailwind/button/TButton.vue";

export default defineComponent({
  name: "App",
  components: {
    TCarousel,
    TButton
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      links: [
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1"
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1"
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1"
        }
      ],
      itemChange: 0,
      itemChange2: 0,
      itemChange3: 0
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/carousel/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
