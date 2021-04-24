<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Checkbox</h3>
    <p class="mb-2">
      The t-checkbox component provides users the ability to choose between two
      distinct values. These are very similar to a switch and can be used in
      complex forms and checklists.
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
      <t-checkbox
        v-model="checkboxModel"
        value="Your value"
        class="mb-3"
      ></t-checkbox>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/xhs4ekz6/3/embedded/html,js/dark/"
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
        When assign a string to this prop, show this text next to the checkbox.
      </p>
      <t-checkbox
        v-model="checkboxModel2"
        value="Your value"
        :label="`Checkbox ${checkboxModel2}`"
        class="mb-3"
      ></t-checkbox>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/cfqb2uzd/1/embedded/html,js/dark/"
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
      <t-checkbox
        v-model="checkboxModel3"
        :trueValue="['foo', 'bar']"
        :falseValue="['biz', 'buz']"
        class="mb-3"
      ></t-checkbox>
      <span>{{ checkboxModel3 }}</span>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/84g70axL/3/embedded/html,js/dark/"
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
      <t-checkbox
        variant="primary"
        v-model="checkboxModel4"
        value="Your value"
        :label="`Primary ${checkboxModel4}`"
        class="mb-3"
      ></t-checkbox>
      <t-checkbox
        variant="success"
        v-model="checkboxModel4"
        value="Your value"
        :label="`Success ${checkboxModel4}`"
        class="mb-3"
      ></t-checkbox>
      <t-checkbox
        variant="warning"
        v-model="checkboxModel4"
        value="Your value"
        :label="`Warning ${checkboxModel4}`"
        class="mb-3"
      ></t-checkbox>
      <t-checkbox
        variant="danger"
        v-model="checkboxModel4"
        value="Your value"
        :label="`Danger ${checkboxModel4}`"
        class="mb-3"
      ></t-checkbox>
      <iframe
        width="100%"
        height="170"
        src="//jsfiddle.net/mohstarsos1/oaek0n4p/4/embedded/html,js/dark/"
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
      <t-checkbox
        disabled
        v-model="checkboxModel5"
        value="Your value"
        :label="`Disabled Checkbox ${checkboxModel5}`"
        class="mb-3"
      ></t-checkbox>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/zqo1fxLb/1/embedded/html,js/dark/"
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
import TCheckbox from "@/components/tailwind/checkbox/TCheckbox.vue";

export default defineComponent({
  name: "App",
  components: {
    TCheckbox
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      checkboxModel: [],
      checkboxModel2: [],
      checkboxModel3: "",
      checkboxModel4: [],
      checkboxModel5: []
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/checkbox/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
