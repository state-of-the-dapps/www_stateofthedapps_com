<template>
  <div class="page">
    <section class="section">
      <div class="text-container">
        <h1 class="heading">Thanks for submitting!</h1>
        <p>Your post will typically be processed by the next business day. Stay tuned for updates via email.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'State of the DApps — Confirmation'
    }
  }
}
</script>

<style lang="scss" scoped>
.text-container {
  @include text-container;
}
</style>
