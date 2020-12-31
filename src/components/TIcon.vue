<template>
  <i v-if="name" class="material-icons pl-1">
    {{ name }}
  </i>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    name: {
      type: String,
      default: ""
    }
  }
});
</script>
