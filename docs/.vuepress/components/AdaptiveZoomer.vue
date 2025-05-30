<template>
  <ImageZoomer ref="zoomer" class="red-border zoomer" v-model:zoom="zoom" transition="all 0.1s ease">
    <AdaptiveDiv class="adaptive-div" v-model:width="width" v-model:height="height" v-model:square="square">
      <img src="/images/300x200.JPG?url" alt="300x200" title="300x200" onload="this.classList.add('loaded')">
      <img src="/images/600x400.JPG?url" alt="600x400" title="600x400" v-if="square * zoom * zoom >= 300 * 200"
        onload="this.classList.add('loaded')">
      <img src="/images/900x600.JPG?url" alt="900x600" title="900x600" v-if="square * zoom * zoom >= 600 * 400"
        onload="this.classList.add('loaded')">
      <img src="/images/DSC08427.JPG?url" alt="1920x1080" title="1920x1080" v-if="square * zoom * zoom >= 900 * 600"
        onload="this.classList.add('loaded')">
    </AdaptiveDiv>
  </ImageZoomer>
</template>

<style scoped lang="scss">
.zoomer {
  width: 100%;
  height: 400px;

  .adaptive-div {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;

      // Workaround against white background of loading image in FireFox on slow connections
      opacity: 0;

      &.loaded {
        opacity: 1;
      }
    }
  }
}
</style>

<script>
import ImageZoomer from '@/ImageZoomer.vue';
import AdaptiveDiv from '@/AdaptiveDiv.vue';

export default {
  components: { ImageZoomer, AdaptiveDiv },

  data() {
    return {
      zoom: 1,
      width: 0,
      height: 0,
      square: 0,
    };
  },
}
</script>
