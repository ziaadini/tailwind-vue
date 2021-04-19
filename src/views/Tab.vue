<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Tab</h3>
    <p class="mb-2">
      The v-tabs component is used for hiding content behind a selectable item.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">This component using for create tabs.</p>

      <t-tabs v-model="tabs" class="mb-3">
        <t-tab-item value="first-tab" title="First" class="text-left">
          First Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
          tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat.
        </t-tab-item>
        <t-tab-item value="second-tab" title="Second" class="text-left">
          Second Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
          tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat.
        </t-tab-item>
        <t-tab-item value="third-tab" title="Third" class="text-left">
          Third Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
          tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat.
        </t-tab-item>
        <t-tab-item value="forth-tab" title="Forth" class="text-left">
          Forth Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
          tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat.
        </t-tab-item>
        <t-tab-item value="fifth-tab" title="Fifth" class="text-left">
          Fifth Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
          tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat.
        </t-tab-item>
      </t-tabs>

      <iframe
        width="100%"
        height="500"
        src="//jsfiddle.net/mohstarsos1/hy1kms42/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Custom Title</h2>
      <p class="mb-2">
        This component using for create tabs with custom title.
      </p>

      <t-tabs v-model="tabs2" class="mb-3" arrows>
        <template #title="{title,selected,count}">
          <div
            class="mx-2 cursor-pointer min-w-max flex flex-col justify-center items-center"
            :class="{ 'text-primary': selected }"
          >
            <div
              class="w-6 h-6  rounded-full items-center justify-center  text-white bg-gray-500"
            >
              {{ count }}
            </div>
            {{ title }}
          </div>
        </template>
        <t-tab-item
          :count="1"
          value="first-tab"
          title="First"
          class="text-left"
        >
          First Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
          tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat.
        </t-tab-item>
        <t-tab-item
          :count="2"
          value="second-tab"
          title="Second"
          class="text-left"
        >
          Second Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
          tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat.
        </t-tab-item>
        <t-tab-item
          :count="3"
          value="third-tab"
          title="Third"
          class="text-left"
        >
          Third Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
          tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat.
        </t-tab-item>
        <t-tab-item
          :count="4"
          value="forth-tab"
          title="Forth"
          class="text-left"
        >
          Forth Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
          tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat.
        </t-tab-item>
        <t-tab-item
          :count="5"
          value="fifth-tab"
          title="Fifth"
          class="text-left"
        >
          Fifth Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
          tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat.
        </t-tab-item>
      </t-tabs>

      <iframe
        width="100%"
        height="500"
        src="//jsfiddle.net/mohstarsos1/fxn5okeb/embedded/html,js/dark/"
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
import TTabs from "@/components/tailwind/tab/TTabs.vue";
import TTabItem from "@/components/tailwind/tab/TTabItem.vue";

export default defineComponent({
  name: "App",
  components: {
    TTabs,
    TTabItem
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      tabs: "",
      tabs2: ""
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/tab/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
