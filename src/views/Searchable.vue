<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Searchable</h3>
    <p class="mb-2">
      With Searchable component, you can allow a user to search values that
      present in a provided items list.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        With this type of component, only provide a list of data for search and
        select an item via user.
      </p>
      <div class="flex w-full items-center mb-4">
        <t-searchable
          class="w-1/6 mr-5"
          v-model="searchableModel"
          placeholder="select..."
          :items="[
            { label: 'VueJS', value: 'VueJS' },
            { label: 'NuxtJS', value: 'NuxtJS' },
            { label: 'React', value: 'React' },
            { label: 'Ember', value: 'Ember' },
            { label: 'Angular', value: 'Angular' }
          ]"
        ></t-searchable>
        <div>Selected item: {{ searchableModel }}</div>
      </div>
      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/13xgw0ry/8/embedded/html/dark"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Custom No Result Message</h2>
      <p class="mb-2">
        You can set a custom message to show user, when component not found
        result to show.
      </p>
      <div class="flex w-full items-center mb-4">
        <t-searchable
          noResult="Sorry, This is a test text!"
          class="w-1/6 mr-5"
          v-model="searchableModel2"
          placeholder="select..."
          :items="[
            { label: 'VueJS', value: 'VueJS' },
            { label: 'NuxtJS', value: 'NuxtJS' },
            { label: 'React', value: 'React' },
            { label: 'Ember', value: 'Ember' },
            { label: 'Angular', value: 'Angular' }
          ]"
        ></t-searchable>
        <div>Selected item: {{ searchableModel2 }}</div>
      </div>
      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/13xgw0ry/8/embedded/html/dark"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Delayed Search</h2>
      <p class="mb-2">This prop provide delay for debouncing.</p>
      <span class="font-bold"
        >notice: Only worked when localSearch prop is false.</span
      ><br />
      <div class="flex w-full items-center mb-4">
        <t-searchable
          :delay="1000"
          class="w-1/6 mr-5"
          v-model="searchableModel3"
          placeholder="select..."
        ></t-searchable>
        <div>Selected item: {{ searchableModel3 }}</div>
      </div>
      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/13xgw0ry/8/embedded/html/dark"
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
import TSearchable from "@/components/tailwind/searchable/TSearchable.vue";

export default defineComponent({
  name: "App",
  components: {
    TSearchable
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      searchableModel: "",
      searchableModel2: "",
      searchableModel3: "",
      searchableItems:[]
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/searchable/README.md").then(res =>
      res.text()
    );
  },
  methods:{
    searchAjax = ({ search, setLoading }) => {
      setLoading(true);
      fetch(
        `https://api.github.com/search/repositories?q=${escape(search)}`
      ).then(res => {
        res.json().then(json => {
          this.searchableItems.value = json.items;
          setLoading(false);
        });
      });
    };
  }
});
</script>

<style lang="scss" scoped></style>
