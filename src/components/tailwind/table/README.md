| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| items | Array of Object | [] | any key value you want to render in table there is some special keys in here : `_cellVariants?: { [key: string]: variants }`, `_rowVariant?: string`, `_showDetails?: boolean` |
| fields | Array of Object  | - | key is the key inside `items` object for example `{ key: 'last_name', label: 'Lastname', sortable: true, variant: 'danger' }` |
| localSort | Boolean | false | is local sort enable |
| rounded | Boolean | true | is table rounded |
| card | Boolean | true | if set true in sm breakpoint will hide the table and show cards instead |
| renderTable | Boolean | true | if you want avoid table rendering base on userAgent or what ever... |
| renderCard | Boolean | true | if you want avoid card rendering base on userAgent or what ever... |
| divideX | Boolean | true | should has border for columns |
| divideY | Boolean | true | should has border for rows |
| hasCounter | Boolean | true | row counter in first column |
| hasCardCounter | Boolean | true | row counter in head of card |
| hover | Boolean | true | highlight a row when is hovering |
| hoverClass | String | hover:bg-gray-100 | hovering class |
| striped | Boolean | false | zebra table |
| stripedClass | String | bg-gray-50 | striped class |




[comment]: <> (### slots)

[comment]: <> (| name | description)

[comment]: <> (| ------------ | ------------ |)

[comment]: <> (| title | for custom styled title|)

[comment]: <> (| text | for custom styled text|)

[comment]: <> (component will pass any useful information to slots : )

[comment]: <> ( 1. bind  -> current item)

[comment]: <> ( 2. show  -> if item is showing)

[comment]: <> ( 3. index -> current item index)
