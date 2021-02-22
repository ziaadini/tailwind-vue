### props

| name               | Type                                 | Default | Description                                                     |
| ------------------ | ------------------------------------ | ------- | --------------------------------------------------------------- |
| variant            | string                               | "white" | sets the bg color                                               |
| divide             | boolean                              | true    | adds border between items of dropdown                           |
| outline            | boolean                              | false   | causes the component to have border and no background           |
| placeholder        | string                               | ""      | the placeholder when no item is selected                        |
| rounded            | boolean                              | false   | causes the component to have a rounded border                   |
| hover              | boolean                              | false   | open dropdown by hover                                          |
| top                | boolean                              | false   | open dropdown on the top                                        |
| items              | array of objects or array of strings | -       | items to show in dropdown                                       |
| opened             | boolean                              | false   | allows to control dropdown open or close state from outside     |
| searchKey          | string                               | ""      | input of the search element                                     |
| labelField         | string                               | "label" | label field                                                     |
| valueField         | string                               | "value" | value field                                                     |
| disabled           | boolean                              | false   | when passed caused the dropdown not to open, or close instantly |
| toggleByHeader     | boolean                              | true    | if false clicking input will not toggle the dropdown            |
| parentColorClasses | string                               | ""      | if passed default parent variant class would be ignored         |
| itemsColorClasses  | string                               | ""      | if passed default item variant class would be ignored           |
| animationDuration  | string                               | "200"   | changes duration of the animation in ms                         |
| animationDelay     | string                               | "0"     | delay of the animation in ms                                    |
| animationDelayType     | string                               | ""     | delay of the animation in ms                                    |

### slots
