# AdaptiveDiv

AdaptiveDiv is a regular div that reports it's dimensions to parent component. 

## Show dimensions

AdaptiveDiv tracks changed dimensions dimensions and reports it in v-model:width, v-model:height and v-model:square.

<AdaptiveDimensions />

@[code vue{2-5}](.vuepress/components/AdaptiveDimensions.vue)

## Adaptive thumbnail

The main purpose of this component is to create adaptive thumbnails or image viewvers. You can see in browser's developer tools which picture is actualy showed.

<AdaptiveThumbnail />

@[code vue{3-10}](.vuepress/components/AdaptiveThumbnail.vue)


## AdaptiveDiv inside ImageZoomer

Since ResizeObserver does not relay on CSS `translate` property, we need the dimensions multiply on the zoom value in parent component.

<AdaptiveZoomer />

@[code vue{2-12}](.vuepress/components/AdaptiveZoomer.vue)


## API

### Models

- `width`: Width of element
- `height`: Height of element
- `square`: widh * height

**Note**: These values are read-only.

### Slots

- default
