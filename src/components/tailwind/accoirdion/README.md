| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| items | Array of Object | - | for example : [{title:"my title",text:"text",selected:true},{ title:"my second title",text:"my second text",disabled:true}] |
| label | string | label | witch key inside object use for label |
| value | string | value | witch key inside object use for value |
| text | string | text | witch key inside object use for text |
| variant | string | primary | pass a valid variant color |
| clickable | boolean | false | go to next step when user clicking on it |



### slots
| name | description
| ------------ | ------------ |
| title | for custom styled title|
| text | for custom styled text|

component will pass any useful information to slots : 
 1. bind  -> current item
 2. show  -> if item is showing
 3. index -> current item index
