<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Switch</h3>
    <p class="mb-2">
      Small filled buttons in different styles and colors can be used for call
      to actions in forms and more.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple (only with value)</h2>
      <p class="mb-2">
        This components contain v-model and value for set state.
        <br /><span class="font-bold"
          >Notice: value pass it when initial of v-model set array.</span
        >
      </p>
      <t-switch
        v-model="switchModel"
        value="Your value"
        class="mb-3"
      ></t-switch>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/0xcdektv/3/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Label</h2>
      <p class="mb-2">
        When assign a string to this prop, show this text next to the switch.
      </p>
      <t-switch
        v-model="switchModel2"
        value="Your value"
        :label="`Switch ${switchModel2}`"
        class="mb-3"
      ></t-switch>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/co3prevg/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">True Value and False Value</h2>
      <p class="mb-2">
        Set this two prop for default value will emit when switch is on and
        initial of v-model is not an array.
      </p>
      <t-switch
        v-model="switchModel3"
        :trueValue="['foo', 'bar']"
        :falseValue="['biz', 'buz']"
        class="mb-3"
      ></t-switch>
      <span>{{ switchModel3 }}</span>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/2nrx3cg0/5/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Variant Color</h2>
      <p class="mb-2">You can use default variant color.</p>
      <t-switch
        variant="primary"
        v-model="switchModel4"
        value="Your value"
        :label="`Primary ${switchModel4}`"
        class="mb-3"
      ></t-switch>
      <t-switch
        variant="success"
        v-model="switchModel4"
        value="Your value"
        :label="`Success ${switchModel4}`"
        class="mb-3"
      ></t-switch>
      <t-switch
        variant="warning"
        v-model="switchModel4"
        value="Your value"
        :label="`Warning ${switchModel4}`"
        class="mb-3"
      ></t-switch>
      <t-switch
        variant="danger"
        v-model="switchModel4"
        value="Your value"
        :label="`Danger ${switchModel4}`"
        class="mb-3"
      ></t-switch>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/L1ahde05/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Disable</h2>
      <p class="mb-2">
        When use this prop, switch locked and not changed state.
      </p>
      <t-switch
        disabled
        v-model="switchModel5"
        value="Your value"
        :label="`Disabled Switch ${switchModel5}`"
        class="mb-3"
      ></t-switch>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/9osax7u5/4/embedded/html,js/dark/"
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
import TSwitch from "@/components/tailwind/switch/TSwitch.vue";

export default defineComponent({
  name: "App",
  components: {
    TSwitch
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      switchModel: [],
      switchModel2: [],
      switchModel3: "",
      switchModel4: [],
      switchModel5: []
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/switch/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
