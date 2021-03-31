<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Menu</h3>
    <p class="mb-2">
      Toggle contextual overlays for displaying lists of links and more.
    </p>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">Simple (use a button to toggle)</h2>
      <p class="mb-2">Choose this basic menu, only with text items.</p>
      <t-menu class="w-30" full>
        <!-- Button content -->
        <template v-slot:button>
          <t-button class="mb-2" outline>Menu (Click to open)</t-button>
        </template>

        <!-- Opened dropdown content -->
        <template v-slot:content>
          <a class="flex w-full justify-between items-center px-2 py-1 my-1">
            Item-1
          </a>
          <a class="flex w-full justify-between items-center px-2 py-1 my-1">
            Item-2
          </a>
          <a class="flex w-full justify-between items-center px-2 py-1 my-1">
            Item-3
          </a>
          <hr />
          <a class="flex w-full justify-between items-center px-2 py-1 my-1">
            Item-4
          </a>
        </template>
      </t-menu>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/brjtn62v/3/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">Placement and Animated</h2>
      <p class="mb-2">Choose this menu and set placement after toggle open also set animation effect.</p>
      <div class="flex">
        <t-menu placement="left" class="w-30">
          <!-- Button content -->
          <template v-slot:button>
            <t-button class="mb-2" outline>Menu (Placement Left)</t-button>
          </template>

          <!-- Opened dropdown content -->
          <template v-slot:content>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-1
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-2
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-3
            </a>
            <hr />
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-4
            </a>
          </template>
        </t-menu>

        <t-menu class="w-30 ml-4">
          <!-- Button content -->
          <template v-slot:button>
            <t-button class="mb-2" outline>Menu (Placement Right)</t-button>
          </template>

          <!-- Opened dropdown content -->
          <template v-slot:content>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-1
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-2
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-3
            </a>
            <hr />
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-4
            </a>
          </template>
        </t-menu>

        <t-menu animate full class="w-30 ml-4">
          <!-- Button content -->
          <template v-slot:button>
            <t-button class="mb-2" outline>Menu (Animated)</t-button>
          </template>

          <!-- Opened dropdown content -->
          <template v-slot:content>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-1
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-2
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-3
            </a>
            <hr />
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-4
            </a>
          </template>
        </t-menu>
      </div>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/h6537opc/2/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">Icon and hover style</h2>
      <p class="mb-2">Choose this menu, set icon for button and hover style.</p>
      <div class="flex">
        <t-menu class="w-30" full>
          <!-- Button content -->
          <template v-slot:button>
            <t-button class="mb-2" icon="speed" outline>Menu</t-button>
          </template>

          <!-- Opened dropdown content -->
          <template v-slot:content>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-1
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-2
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-3
            </a>
            <hr />
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-4
            </a>
          </template>
        </t-menu>

        <t-menu hover class="w-30 ml-4" full>
          <!-- Button content -->
          <template v-slot:button>
            <t-button class="mb-2" variant="success" outline>Menu (Button hover)</t-button>
          </template>

          <!-- Opened dropdown content -->
          <template v-slot:content>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-1
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-2
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-3
            </a>
            <hr />
            <a class="flex w-full justify-between items-center px-2 py-1 my-1">
              Item-4
            </a>
          </template>
        </t-menu>

        <t-menu class="w-30 ml-4" full>
          <!-- Button content -->
          <template v-slot:button>
            <t-button class="mb-2" outline>Menu (items hover)</t-button>
          </template>

          <!-- Opened dropdown content -->
          <template v-slot:content>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white">
              Item-1
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white">
              Item-2
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white">
              Item-3
            </a>
            <hr />
            <a class="flex w-full justify-between items-center px-2 py-1 my-1 hover:bg-red-600 hover:text-white">
              Item-4
            </a>
          </template>
        </t-menu>

        <t-menu hover class="w-30 ml-4" full>
          <!-- Button content -->
          <template v-slot:button>
            <t-button class="mb-2" variant="success" outline>Menu (Button and items hover)</t-button>
          </template>

          <!-- Opened dropdown content -->
          <template v-slot:content>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white">
              Item-1
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white">
              Item-2
            </a>
            <a class="flex w-full justify-between items-center px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white">
              Item-3
            </a>
            <hr />
            <a class="flex w-full justify-between items-center px-2 py-1 my-1 hover:bg-red-600 hover:text-white">
              Item-4
            </a>
          </template>
        </t-menu>
      </div>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/g7shomac/4/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">Disable</h2>
      <p class="mb-2">Choose this menu with disabled mode.</p>
      <t-menu class="w-30" disabled>
        <!-- Button content -->
        <template v-slot:button>
          <t-button class="mb-2" outline>Menu</t-button>
        </template>

        <!-- Opened dropdown content -->
        <template v-slot:content>
          <a class="flex w-full justify-between items-center px-2 py-1 my-1">
            Item-1
          </a>
          <a class="flex w-full justify-between items-center px-2 py-1 my-1">
            Item-2
          </a>
          <a class="flex w-full justify-between items-center px-2 py-1 my-1">
            Item-3
          </a>
          <hr />
          <a class="flex w-full justify-between items-center px-2 py-1 my-1">
            Item-4
          </a>
        </template>
      </t-menu>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/c9rtas0k/embedded/html/dark/"
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
import TButton from "@/components/tailwind/button/TButton.vue";
import TMenu from "@/components/tailwind/menu/TMenu.vue";

export default defineComponent({
  name: "App",
  components: {
    TButton,
    TMenu,
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/menu/README.md").then((res) => res.text());
  },
});
</script>

<style lang="scss" scoped></style>
