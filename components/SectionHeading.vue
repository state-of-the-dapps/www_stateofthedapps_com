<template>
  <h2
    :class="[{'has-line': hasLine}, $i18n.locale]"
    class="SectionHeading">
    <nuxt-link 
      :to="localePath(headingRoute)"
      class="link" 
      @click.native="$emit('clickHeading')">
      <span class="icon-wrapper">
        <slot name="icon"/>
      </span>
      <span class="heading">{{ heading }}</span>
    </nuxt-link>
    <nuxt-link
      v-if="ctaRoute && ctaText"
      :to="localePath(ctaRoute)"
      class="cta" 
      @click.native="$emit('clickCta')">{{ ctaText }}
      <IconChevron
        :width="8"
        :height="8"
        direction="right"/>
    </nuxt-link>
    <nuxt-link
      v-if="secondaryCtaRoute && secondaryCtaText"
      :to="localePath(secondaryCtaRoute)"
      class="cta secondary"
      @click.native="$emit('clickSecondaryCta')">{{ secondaryCtaText }}</nuxt-link>
  </h2>
</template>

<script>
import IconChevron from './IconChevron'

export default {
  components: {
    IconChevron
  },
  props: {
    ctaText: {
      type: String,
      default: ''
    },
    ctaRoute: {
      type: Object,
      default: () => ({
        params: {},
        query: {}
      })
    },
    heading: {
      type: String,
      required: true,
      default: ''
    },
    headingRoute: {
      type: Object,
      required: true,
      default: () => ({})
    },
    hasLine: {
      type: Boolean,
      default: true
    },
    secondaryCtaRoute: {
      type: Object,
      default: () => ({
        params: {},
        query: {}
      })
    },
    secondaryCtaText: {
      type: String,
      default: ''
    }
  }
}
</script>


<style lang="scss" scoped>
.SectionHeading {
  @include font-display;
  display: flex;
  align-items: center;
  font-size: 1.725rem;
  padding-top: 2rem;
  padding-bottom: 1.5rem;
  margin: 0;
  margin-top: 2rem;
  font-weight: 300;
  &.has-line {
    border-top: 1px solid rgba($color--black, 0.15);
  }
  &.zh {
    font-weight: 400;
  }
}

.cta {
  @include font-text;
  padding-top: 5px;
  display: inline-block;
  font-size: 1rem;
  letter-spacing: -0.15px;
  margin-left: 12px;
  text-decoration: none;
  font-weight: 300;
  &.secondary {
    margin-left: auto;
    text-decoration: underline;
    text-align: right;
    padding-left: 10px;
  }
  .zh & {
    font-weight: 400;
  }
}

.icon-wrapper {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.link {
  text-decoration: none;
  display: flex;
  align-items: center;
}
</style>
