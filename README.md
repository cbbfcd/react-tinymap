<h1 align="center">Welcome to react-tinymap 👋</h1>

> This is derived from a [repo](https://github.com/jeremy-carbonne/react-minimap) that has not been maintained for a long time and needs to be used in the project, so it has been implemented with hooks for long-term maintenance

## Install

```sh
yarn install react-tinymap
```

## Usage

```tsx
<TinyMap placement='topRight' selector='.box' keepAspectRatio={false}>
  <Block className='box' style={{position: 'absolute', left: '400px', top: '100px'}}/>
  <Block className='box' style={{position: 'absolute', left: '800px', top: '100px'}}/>
</TinyMap>
```

[example](./example/index.tsx)

## Properties

| property | type |description |default |
| -- | -- | -- | -- |
|selector | string | css selector to find the displayed node | undefined |
|className | string | wrapper class name | undefined |
|miniMapClassName | string | minimap view pointer box class name | undefined |
|keepAspectRatio | boolean | keep aspect ratio | false |
|renderChild | ({ left: number, top: number, width: number, height: number }) => FC | render block | undefined |
|renderViewPort | ({ left: number, top: number, width: number, height: number }) => FC | render view port | undefined |
|width | number | view port width | 200 |
|height | number | view port height | 200 |
|placement | topLeft \| topRight \| bottomLeft \| bottomRight | view port placement | bottomRight |

## Author

👤 **波比小金刚**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_