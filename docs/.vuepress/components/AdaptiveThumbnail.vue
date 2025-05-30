<template>
  <AdaptiveDiv class="adaptive-div red-border" v-model:width="width" v-model:height="height" v-model:square="square">
    <img src="/images/300x200.JPG?url" alt="300x200" title="300x200" onload="this.classList.add('loaded')">
    <img src="/images/600x400.JPG?url" alt="600x400" title="600x400" v-if="square > 300 * 200"
      onload="this.classList.add('loaded')">
    <img src="/images/900x600.JPG?url" alt="900x600" title="900x600" v-if="square > 600 * 400"
      onload="this.classList.add('loaded')">
    <img src="/images/1200x800.JPG?url" alt="1200x800" title="1200x800" v-if="square > 900 * 600"
      onload="this.classList.add('loaded')">
    <div class="resize-handler"></div>
  </AdaptiveDiv>
</template>

<style scoped lang="scss">
.adaptive-div {
  width: 300px;
  height: 200px;
  resize: both;
  overflow: auto;
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
</style>

<script>
import AdaptiveDiv from '@/AdaptiveDiv.vue';

export default {
  components: { AdaptiveDiv },

  data() {
    return {
      width: 0,
      height: 0,
      square: 0,
    };
  },
}
</script>
