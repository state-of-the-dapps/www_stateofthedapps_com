<template>
  <div class="DappForm">
    <section class="section -form">
      <div class="container">
        <DappFormFields
          :errors="errors"
          :existing-dapp="existingDapp"
          :fields="fields"
          :form-type="formType"
          :selected-tags="selectedTags"
          :tag-query="tagQuery"
          :tags-results="tagsResults"
          :warnings="warnings"
          @addTag="addTag"
          @fetchTags="fetchTags"
          @removeTag="removeTag"
          @resetTagResults="resetTagResults"
          @selectTag="selectTag"
          @updateContract="updateContract"
          @updateErrors="updateErrors"
          @updateField="updateField"
          @updateSiteUrl="updateSiteUrl"
          @updateSocial="updateSocial"
          @updateStatus="updateStatus"
          @updateTagQuery="updateTagQuery"
          @updateWarnings="updateWarnings"
          @updateExistingDapp="updateExistingDapp"/>
        <DappFormSave
          v-bind="contractProps"
          :accepted-terms="fields.acceptedTerms"
          :additional-comments="fields.additionalComments"
          :diff-exists="diffExists"
          :error-fields="errorFields"
          :errors="errors"
          :fields="fields"
          :form-type="formType"
          :name="fields.name"
          :profile-score="profileScore"
          :sending="sending"
          :subscribe-newsletter="fields.subscribeNewsletter"
          @addErrorField="addErrorField"
          @checkFormDiff="checkFormDiff"
          @removeErrorField="removeErrorField"
          @setProfileScore="updateProfileScore"
          @submit="submit"
          @updateField="updateField"
          @updateErrors="updateErrors"
          @updateCheckbox="updateCheckbox"/>
      </div>
    </section>
    <BaseModal v-if="confirmationModal">
      <ModalDappsNewConfirmation/>
    </BaseModal>
  </div>
</template>

<script>
import * as deepmerge from 'deepmerge'
import cloneDeep from 'lodash.clonedeep'
import equal from 'deep-equal'
import {
  platformContractComputedFields,
  platformContractDataFields,
  platformContractPropNames
} from '@/helpers/constants'
import BaseModal from './BaseModal'
import DappFormFields from './DappFormFields'
import DappFormSave from './DappFormSave'
import ModalDappsNewConfirmation from './ModalDappsNewConfirmation'

export default {
  components: {
    BaseModal,
    DappFormFields,
    DappFormSave,
    ModalDappsNewConfirmation
  },
  props: {
    endpoint: {
      type: String,
      required: true,
      default: ''
    },
    dapp: {
      type: Object,
      default: () => ({})
    },
    formType: {
      type: String,
      default: 'new'
    },
    mpEventName: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    const obj = {
      confirmationModal: false,
      diffExists: false,
      errorFields: [
        'name',
        'teaser',
        'description',
        'websiteUrl',
        'authors',
        'category',
        'platform',
        'status',
        'tags',
        'email',
        'acceptedTerms'
      ],
      errors: {
        authors: [],
        dappUrl: [],
        description: [],
        email: [],
        license: [],
        icon: [],
        logo: [],
        name: [],
        platform: [],
        socialChat: [],
        tags: [],
        teaser: [],
        acceptedTerms: [],
        websiteUrl: []
      },
      existingDapp: '',
      fields: {
        additionalComments: '',
        authors: [],
        category: '',
        description: '',
        email: '',
        icon: '',
        license: '',
        logo: '',
        name: '',
        platform: '',
        productImage: '',
        socials: {
          facebook: { path: '' },
          twitter: { path: '' },
          github: { path: '' },
          reddit: { path: '' },
          chat: { path: '' },
          blog: { path: '' }
        },
        status: '',
        subscribeNewsletter: false,
        tags: [],
        teaser: '',
        acceptedTerms: false,
        siteUrls: {
          dapp: '',
          website: ''
        }
      },
      originalFields: {},
      profileScore: 0,
      sending: false,
      tagQuery: '',
      tagsResults: [],
      warnings: {
        icon: [],
        logo: [],
        name: [],
        productImage: [],
        teaser: []
      }
    }
    const mergedObj = deepmerge(obj, platformContractDataFields())
    return mergedObj
  },
  computed: {
    ...platformContractComputedFields(),
    acceptedTerms() {
      return this.fields.acceptedTerms
    },
    additionalComments() {
      return this.fields.additionalComments
    },
    authors() {
      return this.fields.authors
    },
    authorsErrors() {
      return this.errors.authors
    },
    category() {
      return this.fields.category
    },
    contractProps() {
      const list = platformContractPropNames()
      const obj = {}
      list.map(propName => {
        obj[propName] = this[propName]
      })
      return obj
    },
    contracts() {
      return this.fields.contracts
    },
    dappUrl() {
      return this.fields.siteUrls.dapp
    },
    dappUrlErrors() {
      return this.errors.dappUrl
    },
    description() {
      return this.fields.description
    },
    descriptionErrors() {
      return this.errors.description
    },
    email() {
      return this.fields.email
    },
    emailErrors() {
      return this.errors.email
    },
    icon() {
      return this.fields.icon
    },
    iconErrors() {
      return this.errors.icon
    },
    iconWarnings() {
      return this.warnings.icon
    },
    license() {
      return this.fields.license
    },
    licenseErrors() {
      return this.errors.license
    },
    logo() {
      return this.fields.logo
    },
    logoErrors() {
      return this.errors.logo
    },
    logoWarnings() {
      return this.warnings.logo
    },
    name() {
      return this.fields.name
    },
    nameErrors() {
      return this.errors.name
    },
    nameWarnings() {
      return this.warnings.name
    },
    platform() {
      return this.fields.platform
    },
    productImage() {
      return this.fields.productImage
    },
    productImageErrors() {
      return this.errors.productImage
    },
    productImageWarnings() {
      return this.warnings.productImage
    },
    selectedTags() {
      return this.fields.tags
    },
    socialBlog() {
      return this.fields.socials.blog.path
    },
    socialFacebook() {
      return this.fields.socials.facebook.path
    },
    socialGithub() {
      return this.fields.socials.github.path
    },
    socialReddit() {
      return this.fields.socials.reddit.path
    },
    socialChat() {
      return this.fields.socials.chat.path
    },
    socialChatErrors() {
      return this.errors.socialChat
    },
    socialTwitter() {
      return this.fields.socials.twitter.path
    },
    status() {
      return this.fields.status
    },
    subscribeNewsletter() {
      return this.fields.subscribeNewsletter
    },
    teaser() {
      return this.fields.teaser
    },
    teaserErrors() {
      return this.errors.teaser
    },
    teaserWarnings() {
      return this.warnings.teaser
    },
    websiteUrl() {
      return this.fields.siteUrls.website
    },
    websiteUrlErrors() {
      return this.errors.websiteUrl
    }
  },
  mounted() {
    if (this.formType === 'edit') {
      this.errorFields = ['email', 'acceptedTerms']
      this.fields = { ...this.fields, ...this.dapp }
      this.originalFields = cloneDeep(this.fields)
    }
  },
  methods: {
    checkFormDiff() {
      const original = { ...this.originalFields }
      delete original.email
      delete original.acceptedTerms
      const current = { ...this.fields }
      delete current.email
      delete current.acceptedTerms
      const diffExists = !equal(original, current)
      this.diffExists = Boolean(diffExists)
    },
    warnBeforeReload(event) {
      event.preventDefault()
      event.returnValue =
        'You are about to leave. Any unsubmitted changes will be lost'
    },
    addErrorField(field) {
      const index = this.errorFields.indexOf(field)
      if (index > -1) {
        this.errorFields.splice(index, 1)
      }
      this.errorFields.push(field)
    },
    addTag(tag) {
      if (this.fields.tags.indexOf(tag) === -1) {
        this.fields.tags.push(tag)
      }
      if (this.fields.tags.length > 0) {
        const index = this.errorFields.indexOf('tags')
        if (index > -1) {
          this.errorFields.splice(index, 1)
        }
      }
    },
    dispatchErrors(errors, model) {
      if (errors.data.length > 0) {
        this.addErrorField(errors.field)
      } else {
        this.removeErrorField(errors.field)
      }
      this.errors[errors.field] = errors.data
    },
    dispatchWarnings(warnings, model) {
      this.warnings[warnings.field] = warnings.data
    },
    fetchTags(query) {
      this.$axios
        .get('tags', {
          params: {
            text: query,
            excluded: this.fields.tags,
            type: 'dapps'
          }
        })
        .then(response => {
          var data = response.data
          var items = data.items
          this.tagsResults = items
        })
    },
    removeErrorField(field) {
      const index = this.errorFields.indexOf(field)
      if (index > -1) {
        this.errorFields.splice(index, 1)
      }
    },
    removeTag(key) {
      this.fields.tags.splice(key, 1)
      let errorIndex = this.errorFields.indexOf('tags')
      if (this.fields.tags.length > 0) {
        if (errorIndex > 0) {
          this.errorFields.splice(errorIndex, 1)
        }
      } else {
        if (errorIndex < 0) {
          this.errorFields.push('tags')
        }
      }
    },
    resetTagResults() {
      this.tagsResults = []
      this.tagQuery = ''
    },
    selectTag(index) {
      if (this.fields.tags.indexOf(this.tagsResults[index]) === -1) {
        this.fields.tags.push(this.tagsResults[index])
      }
      if (this.fields.tags.length > 0) {
        const errorFieldIndex = this.errorFields.indexOf('tags')
        if (errorFieldIndex > -1) {
          this.errorFields.splice(errorFieldIndex, 1)
        }
      }
      this.tagsResults.splice(index, 1)
    },
    submit(data) {
      this.sending = true
      this.$axios
        .post(this.endpoint, data)
        .then(response => {
          this.sending = false
          this.$mixpanel.track(this.mpEventName, {
            disabled: false,
            name: data.fields.name,
            email: data.fields.email,
            author: data.fields.author,
            subscribeNewsletter: data.fields.subscribeNewsletter
          })
          this.confirmationModal = true
        })
        .catch(error => {
          alert(error.response.data.message)
          this.sending = false
        })
    },
    updateCheckbox(field) {
      this.fields[field] = !this.fields[field]
      if (this.fields.acceptedTerms === false) {
        this.addErrorField('acceptedTerms')
      } else {
        this.removeErrorField('acceptedTerms')
      }
    },
    updateContract(field, value) {
      this.fields.contracts[field]['address'] = value
    },
    updateExistingDapp(dapp) {
      this.existingDapp = dapp
    },
    updateErrors(errors) {
      this.dispatchErrors(errors, 'dapps')
    },
    updateField(field, value) {
      this.fields[field] = value
    },
    updateProfileScore(score) {
      this.profileScore = score
    },
    updateSiteUrl(field, value) {
      this.fields.siteUrls[field] = value
    },
    updateSocial(field, value) {
      this.fields.socials[field]['path'] = value
    },
    updateStatus(value) {
      const index = this.errorFields.indexOf('status')
      if (index > -1) {
        this.errorFields.splice(index, 1)
      }
      this.fields.status = value
    },
    updateTagQuery(value) {
      this.tagQuery = value
    },
    updateWarnings(warnings) {
      this.dispatchWarnings(warnings, 'dapps')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include container;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 10px !important;
}

.section {
  &.-form {
    .container {
      @include container;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 20px auto;
      @include tweakpoint('min-width', $tweakpoint--default) {
        margin: 30px auto 200px;
        flex-direction: row;
        width: 800px;
      }
    }
  }
}
</style>
