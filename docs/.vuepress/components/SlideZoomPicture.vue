<template>
  <div class="slider-wrapper red-border">
    <ImageSlider ref="slider" class="image-slider" v-model="index" transition="all 0.2s ease-out"
      :disabled="dzflag && zoom > 1">

      <template v-for="(image, i) in srcset">

        <!-- Wrap current image in a zoomer -->
        <ImageZoomer v-if="i == index" :key="i" v-model:zoom="zoom" transition="all 0.2s linear" :minZoom="1">
          <img :src="`./images/${image}`" :alt="`Image ${i + 1}`" />
        </ImageZoomer>

        <!-- Display other images without zoomer -->
        <img v-else :src="`./images/${image}`" :alt="`Image ${i + 1}`" />

      </template>

    </ImageSlider>

    <button class="btn btn-prev" @click="index--" :disabled="index == 0">&lt;</button>
    <button class="btn btn-next" @click="index++" :disabled="index == 2">&gt;</button>
  </div>
  <div>
    <input type="checkbox" v-model="dzflag">
    Disable switching image by dragging when zoom > 1
  </div>

</template>

<style scoped lang="scss">
.slider-wrapper {
  position: relative;
  width: 600px;
  height: 400px;
  max-width: 100%;
}

.image-slider {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>

<script>
import ImageSlider from '@/ImageSlider.vue';
import ImageZoomer from '@/ImageZoomer.vue';

export default {
  components: { ImageSlider, ImageZoomer },

  data() {
    return {
      index: 0,
      zoom: 1,
      dzflag: true,
      srcset: [
        'DSC08427.JPG',
        'DSC07740.JPG',
        'cat.jpg',
      ],
    };
  },

  watch: {
    index() {
      this.zoom = 1;
    },
  },
}
</script>
