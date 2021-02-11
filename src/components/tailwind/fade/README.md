| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| show | Number, Boolean | - | visible state |
| duration | Number | 300 | milliSecond |
| easeClass | String | ease-out | tailwind ease class |
| opacityClass | String | opacity-1 | final opacity |
| allocateSpace | Boolean | false | reserve space |


### slots
| name | description
| ------------ | ------------ |
| default | render children |

##### slot example

```vue
<slot
    :className="delayedShow ? 'h-full w-full' : 'w-0 h-0 overflow-hidden'"
    :delayedShow="delayedShow"
></slot>
```
because component play around width and height when it's not visible,
therefore className is useful when child container has fix position

the `delayedShow` : when `show` prop is truly will be true synchronously but when 
`show` is falsy will not false until animation has been finished