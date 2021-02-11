| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| v-model | Array, String, Number, Boolean, Object | - | v-model supported with input |
| value | Array, String, Number, Boolean, Object | - | pass it when initial of v-model is array |
| trueValue | Array, String, Number, Boolean, Object | - | true value will emit when switch is on and initial of v-model is not an array |
| falseValue | Array, String, Number, Boolean, Object | - | false value will emit when switch is off and initial of v-model is not an array |
| variant | string | primary | pass a valid variant color |
| disabled | boolean | false | to disable input |
| hideInput | boolean | false | combine it with label slot is useful when you want have a custom radio style |
| activeClass | string | '' | class when it is checked |
| inActiveClass | string | '' | class when it is not checked |

### slots
| name | description
| ------------ | ------------ |
| label | for custom styled label|

 **warning!** don't use block element like `div` inside label slot because component use `label` tag as a container
 and, it's wrong to use block elements inside non-block elements
##### slot example

```vue
<template #label="{isChecked}">
  <div class="px-4  py-2 border-2 rounded-xs" :class="{ 'border-success': isChecked }">
    my custom label
  </div>
</template>
```