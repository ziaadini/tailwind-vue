<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Rating</h3>
    <p class="mb-2">
      The rating component is a specialized but crucial piece in building user
      widgets. Collecting user feedback via ratings is a simple analytic that
      can provide a lot of feedback to your product or application.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        this basic component provides a simple interface for gathering user
        feedback.
      </p>
      <t-rate
        v-model="rateValue"
        class="w-12 mb-2"
        emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
        fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
      ></t-rate>
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/huv5a16w/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Half State</h2>
      <p class="mb-2">Choose this rate, with provide the half state.</p>
      <t-rate
        v-model="rateValue2"
        class="w-12 mb-2"
        emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
        fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
        halfIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Star_Yellow.svg/1024px-Half_Star_Yellow.svg.png"
      ></t-rate>
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/124gwtm5/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Custom Length</h2>
      <p class="mb-2">
        Sometimes an application will call for a customized implementation.
        Easily change length.
      </p>
      <t-rate
        :length="8"
        v-model="rateValue3"
        class="w-12 mb-2"
        emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
        fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
      ></t-rate>
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/h2vzuxt5/4/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Without Hover</h2>
      <p class="mb-2">Set value without hover and worked by click on icon.</p>
      <t-rate
        :hover="false"
        v-model="rateValue4"
        class="w-12 mb-2"
        emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
        fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
      ></t-rate>
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/hfs1wd9t/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Custom Size</h2>
      <p class="mb-2">
        this component provides a custom sizing.
      </p>
      <t-rate
        v-model="rateValue"
        class="w-4 mb-2"
        emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
        fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
      ></t-rate>
      <t-rate
        v-model="rateValue"
        class="w-6 mb-2"
        emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
        fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
      ></t-rate>
      <t-rate
        v-model="rateValue"
        class="w-8 mb-2"
        emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
        fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
      ></t-rate>
      <t-rate
        v-model="rateValue"
        class="w-12 mb-2"
        emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
        fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
      ></t-rate>
      <t-rate
        v-model="rateValue"
        class="w-16 mb-2"
        emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
        fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
      ></t-rate>
      <t-rate
        v-model="rateValue"
        class="w-20 mb-2"
        emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
        fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
      ></t-rate>
      <iframe
        width="100%"
        height="500"
        src="//jsfiddle.net/mohstarsos1/2ubwn60g/3/embedded/html,js/dark/"
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
import TRate from "@/components/tailwind/rate/TRate.vue";

export default defineComponent({
  name: "App",
  components: {
    TRate
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      rateValue: 1,
      rateValue2: 2,
      rateValue3: 3,
      rateValue4: 0
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/rate/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
