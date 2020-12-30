<template>
  <div class="flex justify-center">
     <img alt="Vue logo" src="./assets/logo.png">
  </div>
  <div class="flex items-center flex-col ">
      <app-number-picker :max="5" v-model="numberPickerCount"></app-number-picker>
    <div>#zia</div>
    <div></div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppNumberPicker from "@/components/AppNumberPicker.vue";
import {ref} from 'vue'
export default defineComponent({
  name: 'App',
  components: {
    AppNumberPicker
  },
  setup(){
    const  numberPickerCount=ref(3)

    return {numberPickerCount}
  }
});
</script>
