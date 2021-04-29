<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Radio</h3>
    <p class="mb-2">
      Small filled buttons in different styles and colors can be used for call
      to actions in forms and more.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple (Only with value)</h2>
      <p class="mb-2">
        This components contain v-model and value for set state.
      </p>
      <t-radio v-model="radioModel" value="value1" class="mb-3"></t-radio>
      <t-radio v-model="radioModel" value="value2" class="mb-3"></t-radio>
      <div>Selected Value: {{ radioModel }}</div>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/eyujrhbw/1/embedded/html,js/dark/"
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
        When assign a string to this prop, show this text next to the radio.
      </p>
      <t-radio
        label="Label1"
        v-model="radioModel2"
        value="value1"
        class="mb-3"
      ></t-radio>
      <t-radio
        label="Label2"
        v-model="radioModel2"
        value="value2"
        class="mb-3"
      ></t-radio>
      <div>Selected Value: {{ radioModel2 }}</div>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/6jt5efwb/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Variant Colors</h2>
      <p class="mb-2">
        You can use default variant color.
      </p>
      <t-radio
        variant="primary"
        label="Primary"
        v-model="radioModel3"
        value="value1"
        class="mb-3"
      ></t-radio>
      <t-radio
        variant="success"
        label="Success"
        v-model="radioModel3"
        value="value2"
        class="mb-3"
      ></t-radio>
      <t-radio
        variant="warning"
        label="Warning"
        v-model="radioModel3"
        value="value3"
        class="mb-3"
      ></t-radio>
      <t-radio
        variant="danger"
        label="Danger"
        v-model="radioModel3"
        value="value4"
        class="mb-3"
      ></t-radio>
      <div>Selected Value: {{ radioModel3 }}</div>
      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/ypqn2gwc/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Hide input (for custom use)</h2>
      <p class="mb-2">
        You can also custom this component with hide input and set template for
        is checked mode.
      </p>
      <t-radio hideInput v-model="radioModel4" value="value1" class="mb-3"
        ><template #label="{isChecked}">
          <div
            class="px-4 py-2 border-2 rounded-xs"
            :class="{ 'border-success bg-blue-300': isChecked }"
          >
            Click to select
          </div>
        </template></t-radio
      >
      <t-radio hideInput v-model="radioModel4" value="value2" class="mb-3"
        ><template #label="{isChecked}">
          <div
            class="px-4 py-2 border-2 rounded-xs"
            :class="{ 'border-success bg-red-300': isChecked }"
          >
            Click to select
          </div>
        </template></t-radio
      >
      <div>Selected Value: {{ radioModel4 }}</div>
      <iframe
        width="100%"
        height="380"
        src="//jsfiddle.net/mohstarsos1/k52jp4nh/3/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Disabled</h2>
      <p class="mb-2">
        When use this prop, radio locked and not selectable mode.
      </p>
      <t-radio
        disabled
        label="Disabled Radio"
        v-model="radioModel5"
        value="value1"
        class="mb-3"
      ></t-radio>
      <t-radio
        label="Enabled Radio"
        v-model="radioModel5"
        value="value2"
        class="mb-3"
      ></t-radio>
      <div>Selected Value: {{ radioModel5 }}</div>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/5314h0un/1/embedded/html,js/dark/"
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
import TRadio from "@/components/tailwind/radio/TRadio.vue";

export default defineComponent({
  name: "App",
  components: {
    TRadio
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      radioModel: "",
      radioModel2: "",
      radioModel3: "",
      radioModel4: "",
      radioModel5: ""
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/radio/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
