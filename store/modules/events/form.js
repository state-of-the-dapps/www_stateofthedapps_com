import axios from '~/helpers/axios'

function initialState () {
  return {
    errorFields: [
      'categories',
      'description',
      'email',
      'languages',
      'location',
      'name',
      'organizer',
      'registrationInfo',
      'tags',
      'teaser',
      'websiteUrl'
    ],
    errors: {
      categories: [],
      description: [],
      email: [],
      hashtag: [],
      languages: [],
      name: [],
      organizer: [],
      registrationInfo: [],
      sponsors: [],
      tags: [],
      teaser: [],
      websiteUrl: []
    },
    fields: {
      categories: [],
      description: '',
      email: '',
      hashtag: '',
      languages: [],
      location: '',
      name: '',
      organizer: '',
      registrationInfo: '',
      socials: {
        facebook: {
          path: ''
        },
        twitter: {
          path: ''
        }
      },
      sponsors: [],
      tags: [],
      teaser: '',
      siteUrls: {
        website: ''
      }
    },
    tagQuery: '',
    tagsResults: [],
    warnings: {
      name: [],
      teaser: []
    }
  }
}

const actions = {
  addErrorField ({ commit }, field) {
    commit('ADD_ERROR_FIELD', field)
  },
  addTag ({ commit }, value) {
    commit('ADD_TAG', value)
  },
  fetchTags: ({ commit, state }, value) => {
    axios
      .get('tags', { params: { text: value, excluded: state.fields.tags } })
      .then(response => {
        var payload = response.data.payload
        var items = payload.items
        commit('SET_TAG_RESULTS', items)
      })
  },
  removeErrorField ({ commit }, field) {
    commit('REMOVE_ERROR_FIELD', field)
  },
  removeTag ({ commit }, index) {
    commit('REMOVE_TAG', index)
  },
  resetForm ({ commit }) {
    commit('RESET_FORM')
  },
  resetTagResults ({ commit }) {
    commit('RESET_TAG_RESULTS')
  },
  selectTag ({ commit }, index) {
    commit('SELECT_TAG', index)
  },
  setErrors ({ commit }, errors) {
    commit('SET_ERRORS', errors)
  },
  setField ({ commit }, field) {
    commit('SET_FIELD', field)
  },
  setSiteUrl ({ commit }, field) {
    commit('SET_SITE_URL', field)
  },
  setSocial ({ commit }, field) {
    commit('SET_SOCIAL', field)
  },
  setTagQuery ({ commit }, value) {
    commit('SET_TAG_QUERY', value)
  },
  setWarnings ({ commit }, warnings) {
    commit('SET_WARNINGS', warnings)
  },
  toggleCategory ({ commit }, category) {
    commit('TOGGLE_CATEGORY', category)
  },
  toggleCheckbox ({ commit }, field) {
    commit('TOGGLE_CHECKBOX', field)
  }
}

const mutations = {
  ADD_ERROR_FIELD (state, field) {
    const index = state.errorFields.indexOf(field)
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
    state.errorFields.push(field)
  },
  ADD_TAG (state, value) {
    if (state.fields.tags.indexOf(value) === -1) {
      state.fields.tags.push(value)
    }
    if (state.fields.tags.length > 0) {
      const index = state.errorFields.indexOf('tags')
      if (index > -1) {
        state.errorFields.splice(index, 1)
      }
    }
  },
  REMOVE_ERROR_FIELD (state, field) {
    const index = state.errorFields.indexOf(field)
    if (index > -1) {
      state.errorFields.splice(index, 1)
    }
  },
  REMOVE_TAG (state, index) {
    state.fields.tags.splice(index, 1)
    let errorIndex = state.errorFields.indexOf('tags')
    if (state.fields.tags.length > 0) {
      if (errorIndex > 0) {
        state.errorFields.splice(errorIndex, 1)
      }
    } else {
      if (errorIndex < 0) {
        state.errorFields.push('tags')
      }
    }
  },
  RESET_FORM (state) {
    Object.assign(state, initialState())
  },
  RESET_TAG_RESULTS (state) {
    state.tagsResults = []
    state.tagQuery = ''
  },
  SELECT_TAG (state, index) {
    if (state.fields.tags.indexOf(state.tagsResults[index]) === -1) {
      state.fields.tags.push(state.tagsResults[index])
    }
    if (state.fields.tags.length > 0) {
      const index = state.errorFields.indexOf('tags')
      if (index > -1) {
        state.errorFields.splice(index, 1)
      }
    }
    state.tagsResults.splice(index, 1)
  },
  SET_TAG_RESULTS (state, items) {
    state.tagsResults = items
  },
  SET_ERRORS (state, errors) {
    state.errors[errors.field] = errors.data
  },
  SET_FIELD (state, field) {
    state.fields[field.name] = field.value
  },
  SET_SITE_URL (state, field) {
    state.fields.siteUrls[field.name] = field.value
  },
  SET_SOCIAL (state, field) {
    state.fields.socials[field.name]['path'] = field.value
  },
  SET_TAG_QUERY (state, value) {
    state.tagQuery = value
  },
  SET_WARNINGS (state, warnings) {
    state.warnings[warnings.field] = warnings.data
  },
  TOGGLE_CATEGORY (state, category) {
    const selectedCategories = state.fields.categories.slice() || []
    const categoryIndex = selectedCategories.indexOf(category)
    if (categoryIndex !== -1) {
      state.fields.categories.splice(categoryIndex, 1)
    } else if (selectedCategories.length < 4) {
      state.fields.categories.push(category)
    }
  },
  TOGGLE_CHECKBOX (state, field) {
    state.fields[field] = !state.fields[field]
  }
}

const getters = {
  categories: state => {
    return state.fields.categories
  },
  description: state => {
    return state.fields.description
  },
  descriptionErrors: state => {
    return state.errors.description
  },
  email: state => {
    return state.fields.email
  },
  emailErrors: state => {
    return state.errors.email
  },
  errorFields: state => {
    return state.errorFields
  },
  fields: state => {
    return state.fields
  },
  hashtag: state => {
    return state.fields.hashtag
  },
  hashtagErrors: state => {
    return state.errors.hashtag
  },
  languages: state => {
    return state.fields.languages
  },
  languagesErrors: state => {
    return state.errors.languages
  },
  location: state => {
    return state.fields.location
  },
  name: state => {
    return state.fields.name
  },
  nameErrors: state => {
    return state.errors.name
  },
  nameWarnings: state => {
    return state.warnings.name
  },
  organizer: state => {
    return state.fields.organizer
  },
  organizerErrors: state => {
    return state.errors.organizer
  },
  registrationInfo: state => {
    return state.fields.registrationInfo
  },
  registrationInfoErrors: state => {
    return state.errors.registrationInfo
  },
  selectedTags: state => {
    return state.fields.tags
  },
  socialFacebook: state => {
    return state.fields.socials.facebook.path
  },
  socialTwitter: state => {
    return state.fields.socials.twitter.path
  },
  sponsors: state => {
    return state.fields.sponsors
  },
  sponsorsErrors: state => {
    return state.errors.sponsors
  },
  tagQuery: state => {
    return state.tagQuery
  },
  tagsResults: state => {
    return state.tagsResults
  },
  teaser: state => {
    return state.fields.teaser
  },
  teaserErrors: state => {
    return state.errors.teaser
  },
  teaserWarnings: state => {
    return state.warnings.teaser
  },
  websiteUrl: state => {
    return state.fields.siteUrls.website
  },
  websiteUrlErrors: state => {
    return state.errors.websiteUrl
  }
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state: initialState()
}