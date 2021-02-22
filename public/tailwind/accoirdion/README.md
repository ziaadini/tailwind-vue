| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| items | Array of Object | - | for example : [{title:"my title",text:"text",selected:true},{ title:"my second title",text:"my second text",disabled:true}] |
| collapse | boolean | false | convert accordion to collapse if `true` other items will not close |



### slots
| name | description
| ------------ | ------------ |
| title | for custom styled title|
| text | for custom styled text|

component will pass any useful information to slots : 
 1. bind  -> current item
 2. show  -> if item is showing
 3. index -> current item index
