<template>
  <i v-if="name" class="material-icons pl-1" :class="{'opacity-40':disabled}">
    {{ name }}
  </i>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TIcon",
  props: {
    name: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  }
});
</script>
