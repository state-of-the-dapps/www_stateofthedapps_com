<template>
  <div class="DappAlert">
    <div class="alert-wrapper">
      <p class="alert">{{ alert }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alert: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>


<style lang="scss" scoped>
.alert-wrapper {
  background: rgba($color--warning, 0.15);
  overflow: hidden;
  padding: 0 1rem;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    margin: 0px 10px 15px 10px;
    text-align: left;
  }
}
</style>
