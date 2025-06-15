# ImageSlider

ImageSlider designed for scrolling images in horizontal direction.

## Basic usage

Swipe picture by touch or by mouse

<SlidePicture />

@[code vue{3-21}](.vuepress/components/SlidePicture.vue)

## ImageZoomer > ImageSlider

ImageSlider in combination with ImageZoomer.

<ZoomSlidePicture />

@[code vue{3-24}](.vuepress/components/ZoomSlidePicture.vue)

The disadvantage of this method is that all images in the feed are scaled.

## ImageSlider > ImageZoomer

This method is applicable to a large set of images. Only the current image is enlarged.

<SlideZoomPicture />

@[code vue{7-18}](.vuepress/components/SlideZoomPicture.vue)

## API

### Models

- `default`: Frame index starting at 0.

### Properies

- `disabled`: Set to `true` to disable swiping. Default is `false`. Changing model value will ignore this property.
- `transition`: CSS `transition` property. Default is `none`.
- `threshold`: How many of picture to swipe left or right in order to change frame. Default is `0.15`.

### Methods

- `next()`: Switch to next image.
- `prev()`: Switch to previous image.

### Slots

- `default`
