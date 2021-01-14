<template>
  <div class="flex">
    <div
      :class="['step flex-col   w-auto ', { 'flex-grow': 1 }]"
      v-for="item in steps"
      :key="item"
    >
      <div class="top flex items-center">
        <div
          :class="[
            'devider h-1  flex-grow',
            { 'bg-gray-200': item !== 1 && item > value },
            { 'bg-black': item <= value && item !== 1 },
          ]"
        ></div>
        <div
          :class="[
            'circle rounded-full h-12 w-12 border-2 flex  items-center justify-center hover:bg-gray-100 hover:border-gray-100 hover:text-black cursor-pointer',
            { 'bg-black text-white border-black': item <= value },
            { 'border-gray-200': item > value },
          ]"
          @click="$emit('input' ,item )"
        >
          <span>{{ item }}</span>
        </div>
        <div
          :class="[
            'devider h-1  flex-grow',
            { 'bg-gray-200': item !== steps && item >= value },
            { 'bg-black': item < value && item !== steps },
          ]"
        ></div>
      </div>
      <div :class="['title', { 'text-center': true }]">
        <slot :name="'step' + item"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TStepper',
  props: {
    steps: {
      type: Number,
      default: 1,
      required: true,
    },
    value: {
      type: Number,
      default: 1,
      required: true,
    },
  },
}
</script>


