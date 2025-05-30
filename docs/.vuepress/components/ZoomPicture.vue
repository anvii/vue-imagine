<template>
  <ImageZoomer ref="zoomer" class="red-border"
    v-model:zoom="zoom"
    v-model:scrollX="scrollX"
    v-model:scrollY="scrollY"
    :transition="transition">
    <img src="/images/DSC08427.JPG?url" alt="" class="client-image" />
  </ImageZoomer>

  <div class="controls">
    <label>
      <span>zoom:</span>
      <input type="number" step="0.3" v-model="zoom">
    </label>

    <label>
      <span>scrollX:</span>
      <input type="number" step="10" v-model="scrollX">
    </label>

    <label>
      <span>scrollY:</span>
      <input type="number" step="10" v-model="scrollY">
    </label>

    <label>
      <span>transition:</span>
      <div style="text-align: left;">
        <input type="checkbox" v-model="transition" true-value="all 0.2s ease" false-value="none">
        {{ transition }}
      </div>
    </label>

  </div>
</template>

<style lang="css" scoped>
img.client-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<script lang="js">
import ImageZoomer from '@/ImageZoomer.vue';
import './style.css';

export default {
  components: { ImageZoomer },

  data() {
    return {
      zoom: 1,
      scrollX: 0,
      scrollY: 0,
      transition: 'all 0.2s ease',
    };
  },
}
</script>
