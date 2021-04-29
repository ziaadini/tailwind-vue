### props
| name | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| v-model | Number | - | pass second to count down |
| countDown | Number | 1000 | interval millisecond |
| duration | number | 3000 | showing duration default is 3seconds |
| message | string | '' | message you want to show |

### slots
| name | description 
| ------------ | ------------ |
| default | useful for custom style |

```vue
<slot
      name="default"
      :day="day"
      :hideDays="hideDays"
      :hours="hours"
      :hideHours="hideHours"
      :minutes="minutes"
      :hideMinutes="hideMinutes"
      :seconds="seconds"
      :hideSeconds="hideSeconds"
    ></slot>
```

