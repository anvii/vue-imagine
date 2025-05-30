<template>
  <div class="slider-wrapper red-border">
    <ImageSlider ref="slider" class="image-slider" v-model="index" transition="all 0.2s ease-out">
      <img src="/images/DSC08427.JPG?url" alt="Image 1" />
      <img src="/images/DSC07740.JPG?url" alt="Image 2" />
      <img src="/images/cat.jpg?url" alt="Image 3" />
      <div>
        <h1>Hello!</h1>
        <p>Welcome to the image slider component.</p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
          magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
          assumenda consectetur culpa fuga nulla ullam. In, libero.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
          magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
          assumenda consectetur culpa fuga nulla ullam. In, libero.
        </p>
      </div>
    </ImageSlider>

    <button class="btn btn-prev" @click="$refs.slider.prev()" :disabled="index == 0">&lt;</button>
    <button class="btn btn-next" @click="$refs.slider.next()" :disabled="index == 3">&gt;</button>
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
}
</style>

<script>
import ImageSlider from '@/ImageSlider.vue';

export default {
  components: { ImageSlider },

  data() {
    return {
      index: 0,
    };
  },
}
</script>
