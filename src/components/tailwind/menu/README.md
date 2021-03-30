### props

| name      | Type    | Default | Description                                                                  |
| --------- | ------- | ------- | ---------------------------------------------------------------------------- |
| placement | string  | "right" | when full prop is not passed this prop makes the list to go to right or left |
| disabled  | boolean | false   | when passed caused the dropdown not to open, or close instantly              |
| full      | boolean | false   | causes the list to fill the space                                            |
| hover     | boolean | false   | opens the list on hover                                                      |
| animate   | boolean | false   | animate the list on open                                                     |

### slots

| name | description
| button | the button which opens the list |
| content | list of items to show in the list |
