### props
| name | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| v-model | number or boolean |0| state of modal (close or open) |
| title | string | "" | title for modal |
| titleTag | string | h4 | which html tag use for title |
| hasCloseButton | boolean | true | show close button to the user |
| closeCallback | function | ()=>{} | if return truly value modal will close if not will not |
| eager | boolean | false | mount content even when modal is close set to true when content is useful for seo
| maxSize | string | full | set max size base on `xs, sm, md, lg, full`
| full | boolean | false | full-width drawer
| left | boolean | false | open from left side
| teleportTo | string | - | for teleport modal content to specific selector for example `'#modal-content'`

we strongly recommend use teleport

### slots
| name | description 
| ------------ | ------------ |
| title | for custom title |
| closeButton | for custom close button |

