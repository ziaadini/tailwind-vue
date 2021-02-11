### props

| name           | Type     | Default         | Description                                                                        |
| -------------- | -------- | --------------- | ---------------------------------------------------------------------------------- |
| items          |          | BreadCrumb.Root | input data for the bread crumb                                                     |
| nuxt           | boolean  | false           | if true nuxt link will be generated                                                |

we strongly recommend use teleport

### slots

| name        | description             |
| ----------- | ----------------------- |
| default       | for custom style on each item of breadcrumb        |
| beforeLink | for rendering before any item in the breadcrumb |
| afterLink | for rendering after any item in the breadcrumb |
