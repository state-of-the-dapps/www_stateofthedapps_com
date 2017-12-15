import { eventRefineTabOptions as tabOptions } from '~/helpers/constants'
// import axios from '~/helpers/axios'

function initialQuery () {
  return {
    tab: tabOptions[0],
    limit: 50,
    offset: 0,
    tags: [],
    text: ''
  }
}

const actions = {}

const getters = {}

const mutations = {}

const state = {
  activeItemIndex: -1,
  refine: {
    tabs: {
      isActive: false
    }
  },
  friendlyUrl: '/',
  items: [],
  isLoading: true,
  pager: {
    offset: 0,
    totalCount: 0
  },
  query: initialQuery()
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
