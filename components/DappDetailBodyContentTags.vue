<template>
  <div class="DappDetailBodyContentTags">
    <div class="wrapper">
      <h4 class="subtitle">{{ $t('tags') | capitalize }}</h4>
      <ul class="tag-list">
        <li
          v-for="(tag, index) in formattedTags"
          :key="index"
          class="tag-item">
          <a
            class="tag-link"
            @click="findDappsByTag(tag)">{{ tag }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { trackDappTag } from '~/helpers/mixpanel'

export default {
  props: {
    slug: {
      type: String,
      required: true,
      default: ''
    },
    tags: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    formattedTags() {
      var tags
      tags = this.tags || []
      return this.$options.filters.removeEmptyArrayItems(tags)
    }
  },
  methods: {
    findDappsByTag(tag) {
      this.trackDappTag(tag)
      this.$router
        .push(
          this.localePath({
            name: 'dapps',
            query: { tags: tag }
          })
        )
        .catch(err => {})
    },
    trackDappTag(name) {
      const action = trackDappTag(name, this.slug)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
.subtitle {
  font-weight: normal;
  margin-bottom: 0.75rem;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
  justify-content: center;
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
}

.tag-link {
  text-decoration: none;
  display: block;
  padding: 5px 8px;
  margin: 4px;
  background: lighten($color--gray, 2%);
  border-radius: 1000px;
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
