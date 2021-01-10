| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| v-model | Array, String, Number, Boolean, Object | - | v-model supported with input |
| value | Array, String, Number, Boolean, Object | - | value of radio button |
| variant | string | primary | pass a valid variant color |
| disabled | boolean | false | to disable input |
| hideInput | boolean | false | combine it with label slot is useful when you want have a custom radio style |


### slots
| name | description
| ------------ | ------------ |
| label | for custom styled label|

##### slot example

```vue
<template #label="{isChecked}">
  <div class="px-4  py-2 border-2 rounded-xs" :class="{ 'border-success': isChecked }">
    my custom label
  </div>
</template>
```