<template>
  <div class="layout">
    <PageHeading :title="title"/>
    <p>You can always <nuxt-link to="/">start over</nuxt-link>. Also, feel free to <a :href="'mailto:support@stateofthedapps.com?subject=Error on State of the DApps website&body=There is an error on this page: https://www.stateofthedapps.com' + $route.fullPath">let us know</a> about this error.</p>
    <p class="button-wrapper">
      <nuxt-link
        :to="localePath({name: 'rankings'})"
        class="button"
        @click.native="$mixpanel.track('Error page CTA', {route: $route.path})">Check out the top DApps</nuxt-link>
    </p>
  </div>
</template>

<script>
import PageHeading from '@/components/PageHeading'

export default {
  components: {
    PageHeading
  },
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title() {
      if (this.error.statusCode === 404) {
        return `Whoops, we couldn't find that page`
      } else {
        return `Whoops, an error occurred`
      }
    }
  },
  mounted() {
    this.$mixpanel.track('Error page', {
      type: this.error.statusCode,
      message: this.error.message,
      resource: this.$route.fullPath
    })
  }
}
</script>

<style lang="scss" scoped>
.button-wrapper {
  margin: 3rem 0;
}

.button {
  @include button;
  padding: 10px 20px;
}

.layout {
  min-height: 100%;
  text-align: center;
}
</style>
