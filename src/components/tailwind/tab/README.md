# t-tab props
| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| v-model | Array, String, Number, Boolean, Object | - | v-model supported with input |
| arrows | Boolean | true | show arrows when scrolling |

# t-tab-item props
| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| eager | Boolean | false | set to true if you want seo |
| title | String | - | title for tab |
| value | primitive types | - | use value instead of index for v-model value |

### t-tab slots
| name | description
| ------------ | ------------ |
| title | slot for render tab header passed data is : selected and all props passed to t-tab-item|


```vue

<t-tabs v-model="customTab">
  <template #title="{title,selected,count}">
  <div
    class="mx-2 cursor-pointer min-w-max"
  :class="{ 'text-primary': selected }"
>
  <div
    class="w-6 h-6  rounded-full items-center justify-center  text-white bg-gray-500"
  >
    {{ count }}
  </div>
  {{ title }}
</div>
</template>
<t-tab-item :count="1" value="first-tab" eager title="tab1">
Lorem Ipsum is simply dummy text of the printing and typesetting
industry. Lorem Ipsum has been the industry's standard dummy text ever
since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five
centuries, but also the leap into electronic typesetting, remaining
essentially unchanged. It was popularised in the 1960s with the release
of Letraset sheets containing Lorem Ipsum passages, and more recently
with desktop publishing software like Aldus PageMaker including versions
of Lorem Ipsum.
</t-tab-item>
<t-tab-item :count="2" title="tab2">
It is a long established fact that a reader will be distracted by the
readable content of a page when looking at its layout. The point of
using Lorem Ipsum is that it has a more-or-less normal distribution of
letters, as opposed to using 'Content here, content here', making it
look like readable English. Many desktop publishing packages and web
page editors now use Lorem Ipsum as their default model text, and a
search for 'lorem ipsum' will uncover many web sites still in their
infancy. Various versions have evolved over the years, sometimes by
accident, sometimes on purpose (injected humour and the like).
</t-tab-item>
<t-tab-item :count="3" title="tab3">
Contrary to popular belief, Lorem Ipsum is not simply random text. It
has roots in a piece of classical Latin literature from 45 BC, making it
over 2000 years old. Richard McClintock, a Latin professor at
Hampden-Sydney College in Virginia, looked up one of the more obscure
Latin words, consectetur, from a Lorem Ipsum passage, and going through
the cites of the word in classical literature, discovered the
undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
Cicero, written in 45 BC. This book is a treatise on the theory of
ethics, very popular during the Renaissance. The first line of Lorem
Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
1.10.32.
</t-tab-item>
<t-tab-item :count="1" title="tab4">
There are many variations of passages of Lorem Ipsum available, but the
majority have suffered alteration in some form, by injected humour, or
randomised words which don't look even slightly believable. If you are
going to use a passage of Lorem Ipsum, you need to be sure there isn't
anything embarrassing hidden in the middle of text. All the Lorem Ipsum
generators on the Internet tend to repeat predefined chunks as
necessary, making this the first true generator on the Internet. It uses
a dictionary of over 200 Latin words, combined with a handful of model
sentence structures, to generate Lorem Ipsum whi
</t-tab-item>
</t-tabs>

```