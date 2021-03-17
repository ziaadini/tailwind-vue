<script lang="ts">
import { defineComponent } from "vue";
// Uncomment import and local "components" registration if library is not registered globally.
// import { TAlert } from "../dist/npm-library.esm";
// import { TBadge } from "../dist/npm-library.esm";
// import { TAccordion } from "../dist/npm-library.esm";
import '../src/assets/css/index.css'
export default defineComponent({
  name: "ServeDev",
  components: {
    // TAlert,
    // TBadge,
    // TAccordion,
  },
  data() {
    return {
      show: false,
    };
  },
});
</script>

<template>
  <div id="app" class="bg-red-500 h-screen">
      <TAlert show variant="primary" v-model="show">
        sfd
      </TAlert>
    <t-badge>
      <TAccordion :items="[{title: 'ali', text: 'ali'}]"></TAccordion>
    </t-badge>
  </div>
</template>
