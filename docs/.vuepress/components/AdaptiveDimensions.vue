<template>
  <AdaptiveDiv class="adaptive-div red-border" v-model:width="width" v-model:height="height" v-model:square="square">
    {{ width }}x{{ height }} = {{ square }}
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
  display: flex;
  justify-content: center;
  align-items: center;
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
