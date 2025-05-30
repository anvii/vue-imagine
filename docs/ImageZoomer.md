# ImageZoomer

ImageZoomer component allows you to zoom an image inside a rectagle. This page demonstrates various application options.

## View a picture

Use mouse wheel for zoom-in or zoom-out

<ZoomPicture />

@[code vue{2-8}](.vuepress/components/ZoomPicture.vue)

## View not only pictires

You can zoom any content. For example - text, tables, svg, etc...

<ZoomText />

@[code vue{3-14}](.vuepress/components/ZoomText.vue)


## Fit content

And other methods.

<FitContent />

@[code vue{11-14}](.vuepress/components/FitContent.vue)

## API

### Models

- `zoom`: Zoom value (default 1)
- `scrollX`: Horizontal scroll in pixels (default 0)
- `scrollY`: Vertical scroll in pixels (default 0)

### Properties

- `minZoom`: Minimum zoom value (default 0.1)
- `maxZoom`: Maximum zoom value (default 10)
- `zoomFactor`: Multiplier for zoom (default 1.1)
- `transition`: CSS transition rule (default 'none')

### Methods

- `zoomIn(): void`

    Zoom in content

- `zoomOut(): void`

    Zoom out content

- `toClient(x: number, y: number): { x: number, y: number }`

    Convert screen position to client (component) position. Generally used to convert mouse coordinates to position in bounding rectangle.

- `scale(x: number, y: number, azoom?: number): { x: number, y: number }`

    Translate client coordinates to image coordinates. Parameter `azoom` is zoom value by default.

- `unscale(x: number, y: number, azoom?: number): { x: number, y: number }`

    Translate image coordinates to client coordinates. Parameter `azoom` is zoom value by default.

- `function fit(mode: 'contain' | 'cover')`

    Fit content into client rect


### Slots

- default
