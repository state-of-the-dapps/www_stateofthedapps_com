<template>
  <div
    id="websiteUrl" 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="DappFormFieldsWebsite item">
    <p class="heading"><span class="checkmark"><IconCheckmark :fill="url.length >= 3 && !errors.length ? 'purple' : 'gray'"/></span>Website URL <span class="required">(required)</span></p>
    <input
      id="websiteUrlField"
      :class="url.length > 0 ? '--is-filled' : ''" 
      :value="url" 
      class="text-input" 
      type="text"
      placeholder="e.g. https://www.websiteurl.com"
      maxlength="500" 
      @input="updateAndValidate($event.target.value)">
    <span
      v-if="url.length"
      class="remaining-characters">{{ 500 - url.length }}</span>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">A URL to this DApp's website</p>
  </div>
</template>

<script>
import IconCheckmark from './IconCheckmark'

export default {
  components: {
    IconCheckmark
  },
  props: {
    errors: {
      type: Array,
      required: true,
      default: () => []
    },
    url: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  methods: {
    updateAndValidate(value) {
      this.$emit('updateSiteUrl', 'website', value)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'websiteUrl',
        data: []
      }
      this.validationTimer = setTimeout(() => {
        this.url.length < 3
          ? errors.data.push(`Website URL must be longer than 2 characters`)
          : ''
        this.$emit('updateErrors', errors)
      }, 750)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-input {
  @include highlight;
}
</style>
