import { defineClientConfig } from 'vuepress/client';
import ZoomPicture from './components/ZoomPicture.vue';
import ZoomText from './components/ZoomText.vue';
import FitContent from './components/FitContent.vue';
import SlidePicture from './components/SlidePicture.vue';
import ZoomSlidePicture from './components/ZoomSlidePicture.vue';
import SlideZoomPicture from './components/SlideZoomPicture.vue';
import AdaptiveDimensions from './components/AdaptiveDimensions.vue';
import AdaptiveThumbnail from './components/AdaptiveThumbnail.vue';
import AdaptiveZoomer from './components/AdaptiveZoomer.vue';

export default defineClientConfig({
  enhance({ app }) {
    app.component('ZoomPicture', ZoomPicture);
    app.component('ZoomText', ZoomText);
    app.component('FitContent', FitContent);
    app.component('SlidePicture', SlidePicture);
    app.component('ZoomSlidePicture', ZoomSlidePicture);
    app.component('SlideZoomPicture', SlideZoomPicture);
    app.component('AdaptiveDimensions', AdaptiveDimensions);
    app.component('AdaptiveThumbnail', AdaptiveThumbnail);
    app.component('AdaptiveZoomer', AdaptiveZoomer);
  },
})
