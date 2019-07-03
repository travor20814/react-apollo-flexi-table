# React Apollo Flexi Table

A flexible table with frozen header for React and well combined with react-apollo. By using this table, You can easily sharing flex ratio on both table header and table items, and all components are written in hooks.

![Demo GIF](https://github.com/travor20814/react-apollo-flexi-table/blob/master/table-scroll.gif)

## Usage

```javascript
import React from 'react';
import {
  Table,
  TableField,
} from 'react-apollo-flexi-table';

function Example() {
   return (
     <Table
       dataSource={[{
         id: 1,
         name: 'John',
       }, {
         id: 2,
         name: 'Ben',
       }]}>
       <TableField
         name="User Name"
         fieldKey="name"
         flex={1}
         isCenter />
     </Table>
   );
}
```
Please check my examples folder and you will see more details.
https://github.com/travor20814/react-apollo-flexi-table/blob/master/examples/table/FlexiTable.jsx

## Options
### Table Props
| name | type | defaultValue | required |
| -- | -- | -- | -- |
| children | `Array<React.Node>` | `null` | v |
| dataSource | `Array<Object>` | `undefined` | v |
| actionTitles | `Array<string>` | `undefined` | |
| getActions | `Function` | `undefined` | |
| fetchMore | `Function` | `undefined` | |
| fetchMoreHeight | `number` | `150` | |
| showPlaceholder | `boolean` | `undefined` | |
| placeholder | `string` | `null` | |
| placeholderColor | `string` | `#9b9b9b` | |
| placeholderWrapperStyle | `Object` | `null` | |
| placeholderStyle | `Object` | `null` | |
| headerBackgroundColor | `string` | `transparent` | |
| headerTextColor | `string` | `#000` | |
| headerBorder | `string` | `0px solid #000`| |
| headerBorderRadius | `number` | `0` | |
| headerFontSize | `number` | `18` | |
| headerWrapperStyle | `Object` | `null` | |
| itemWrapperStyle | `Object` | `null` | |
| wrapperStyle | `Object` | `null` | |

### TableField Props

| name | type | defaultValue | required |
| -- | -- | -- | -- |
| name | `string` | `undefined` | v |
| fieldKey | `string` | `undefined` | v |
| flex | `number` | `1` | |
| minWidth | `number` | `undefined` | |
| color | `string` | `#9b9b9b` | |
| isCenter | `boolean` | `false` | |
| isImage | `boolean` | `false` | |
| style | `Object` | `undefined` | |
| Component | `React.Node` | `null` | |

## Descriptions

#### Table

* `children` - You should use our TableField for clearly defining what Table child is.

* `dataSource` - The data list you want to map to the table. You must be careful about the `key` you use. TableField's prop `fieldKey` will find value base on the object key.

* `actionTitles` - actions will place on the right-hand side of the table. Here you can assign these action fields title.

* `getActions` - You can pass any components you want in a function that return an array of components.

* `fetchMore` - It makes you easily work with `react-apollo` `fetchMore`, and it will trigger this function when table's `remain scroll height` is less than `fetchMoreHeight`, which default is 150px.

* `fetchMoreHeight` - Define when should the fetchMore function been triggered when table remain scroll height is less than `fetchMoreHeight`

#### TableField

* `name` - Define field name you want to show on the header.

* `fieldKey` - Define what `dataSource` key you want to take.

* `flex` - Define field flex in the table. It will helps you synchronize header flex and item field flex.

* `style` - If you want customizing your field style, you can pass any css style you want to override it.

* `Component` - You can pass your custom component here, and it will replace the origin one. Also, some table useful props will pass into your custom component.
