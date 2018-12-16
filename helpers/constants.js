const dappGameTag = 'game'

const dappListDefaultLimit = 50

const dappListDefaultSort = 'rank'

const dappListDefaultOrder = 'asc'

const dappFeaturedSlots = 4

const dappPromotedSlots = 3

const dappMetaBadges = [
  'rank',
  'users_1d',
  'users_7d',
  'users_30d',
  'tx_1d',
  'tx_7d',
  'tx_30d',
  'value_1d',
  'value_7d',
  'value_30d',
  'status',
  'feedback'
]

const dappFallbackRedirectPath = '/dapps'

const dappSchema = Object.freeze({
  authors: [],
  badges: [],
  contractsMainnet: [],
  contractsKovan: [],
  contractsRinkeby: [],
  contractsRopsten: [],
  contractsPoaMainnet: [],
  contractsPoaTestnet: [],
  contractsEosMainnet: [],
  contractsSteemMainnet: [],
  created: '',
  description: '',
  isNew: false,
  isNsfw: false,
  lastUpdated: '',
  license: '',
  logoUrl: '',
  name: '',
  nofollow: false,
  platform: '',
  productImage: '',
  relatedDapps: [],
  sites: {
    websiteUrl: '',
    dappUrl: ''
  },
  slug: '',
  socials: [],
  sparklines: {
    transactions: [],
    users: []
  },
  stats: {
    ctr: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
    impressions: 0,
    clicks: 0,
    dau: 0,
    mau: 0,
    tx_1d: 0,
    tx_30d: 0,
    tx_7d: 0,
    wau: 0,
    qau: 0,
    tx_90d: 0,
    flagged: 0,
    shared: 0,
    suggested: 0,
    contract_created: ''
  },
  status: '',
  tags: [],
  teaser: ''
})

const dappBadgeMap = Object.freeze({
  '0x': {
    component: 'SvgBadge0x',
    description: '0x protocol compatible'
  },
  complete: {
    component: 'SvgBadgeComplete',
    description: 'Has a complete profile'
  },
  consensys: {
    component: 'SvgBadgeConsensys',
    description:
      'Part of <a href="https://new.consensys.net/" target="_blank">Consensys</a>'
  },
  featured: {
    component: 'SvgBadgeFeatured',
    description: 'Currently featured'
  },
  hot: {
    component: 'SvgBadgeHot',
    description: 'Currently hot'
  },
  metamask: {
    component: 'SvgBadgeMetamask',
    description:
      'Works with <a href="https://www.metamask.io" target="_blank">Metamask</a>'
  },
  solidified: {
    component: 'SvgBadgeSolidified',
    description:
      'Audited by <a href="https://solidified.io/" target="_blank">Solidified</a>'
  },
  'status-im': {
    component: 'SvgBadgeStatus',
    description: 'On <a href="https://status.im/" target="_blank">Status.im</a>'
  },
  token: {
    component: 'SvgBadgeToken',
    description: 'Has a token'
  }
})

const dappSocialComponentMap = Object.freeze({
  chat: 'SvgSocialChat',
  blog: 'SvgSocialBlog',
  facebook: 'SvgSocialFacebook',
  github: 'SvgSocialGithub',
  gitter: 'SvgSocialGitter',
  reddit: 'SvgSocialReddit',
  twitter: 'SvgSocialTwitter'
})

const dappStatuses = Object.freeze([
  'live',
  'beta',
  'prototype',
  'wip',
  'concept',
  'broken',
  'stealth',
  'abandoned'
])

const dappRefineStatusOptions = dappStatuses.slice()
dappRefineStatusOptions.unshift('All statuses')

const dappRefineTabOptions = Object.freeze([
  'hot',
  'new',
  'most-viewed',
  'most-relevant'
])

const dappSortOptions = Object.freeze([
  {
    text: 'Hottest',
    selection: 'hot'
  },
  {
    text: 'Newest',
    selection: 'new'
  }
])

const dappSortOptionsMap = {
  new: 'Newest',
  hot: 'Hottest',
  'most-relevant': 'Hottest'
}

const daysOfTheWeek = Object.freeze([
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
])

const dappDefaultPlatform = 'Ethereum'

const eventCategories = Object.freeze([
  'conference',
  'crowdsale',
  'hackathon',
  'ico',
  'meetup',
  'release',
  'summit',
  'workshop'
])

const eventRefineCategoryOptions = eventCategories.slice()
eventRefineCategoryOptions.unshift('all')

const feedbackComponentMap = Object.freeze({
  negative: 'SvgFeedbackNegative',
  neutral: 'SvgFeedbackNeutral',
  positive: 'SvgFeedbackPositive'
})

const homeFeaturedCollections = 3

const homeCollectionSlots = 6

const myListLimit = 50

const platformList = ['Ethereum', 'EOS', 'POA', 'Steem']

const platformMap = {
  ethereum: 'Ethereum',
  eos: 'EOS',
  poa: 'POA',
  steem: 'Steem'
}

const platformSoftware = {
  Ethereum: {
    name: 'Metamask',
    url: 'https://metamask.io/?utm_source=StateOfTheDApps'
  },
  EOS: {
    name: 'Scatter',
    url: 'https://get-scatter.com/?utm_source=StateOfTheDApps'
  },
  POA: {
    name: 'Nifty',
    url:
      'https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid?utm_source=StateOfTheDApps'
  }
}

function dappFormState() {
  return {
    errorFields: [
      'authors',
      'category',
      'description',
      'email',
      'name',
      'status',
      'tags',
      'teaser',
      'acceptedTerms',
      'websiteUrl'
    ],
    errors: {
      authors: [],
      dappUrl: [],
      description: [],
      email: [],
      kovan: [],
      license: [],
      icon: [],
      logo: [],
      mainnet: [],
      name: [],
      poaMainnet: [],
      poaTestnet: [],
      eosMainnet: [],
      steemMainnet: [],
      productImage: [],
      rinkeby: [],
      ropsten: [],
      socialChat: [],
      tags: [],
      teaser: [],
      acceptedTerms: [],
      websiteUrl: []
    },
    existingDapp: '',
    fields: {
      authors: [],
      category: '',
      description: '',
      contracts: {
        mainnet: { address: '' },
        poaMainnet: { address: '' },
        poaTestnet: { address: '' },
        eosMainnet: { address: '' },
        steemMainnet: { address: '' },
        ropsten: { address: '' },
        kovan: { address: '' },
        rinkeby: { address: '' }
      },
      email: '',
      icon: '',
      license: '',
      logo: '',
      name: '',
      platform: dappDefaultPlatform,
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
      submitReason: '',
      subscribeNewsletter: false,
      tags: [],
      teaser: '',
      acceptedTerms: false,
      siteUrls: {
        dapp: '',
        website: ''
      }
    },
    profileScore: 0,
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
}

const rankingColumns = Object.freeze([
  {
    selection: 'dau',
    text: 'Users (24h)',
    sort: true
  },
  {
    selection: 'platform',
    text: 'Platform',
    sort: false
  },
  {
    selection: 'category',
    text: 'Category',
    sort: false
  },
  {
    selection: 'usd_value_7d',
    text: 'Volume (7d)',
    sort: true
  },
  {
    selection: 'dev_30d',
    text: 'Dev (30d)',
    sort: true
  },
  {
    selection: 'user_activity_30d',
    text: 'User activity (30d)',
    sort: false
  }
])

export {
  dappBadgeMap,
  dappFallbackRedirectPath,
  dappFormState,
  dappGameTag,
  dappListDefaultLimit,
  dappListDefaultSort,
  dappListDefaultOrder,
  dappMetaBadges,
  dappFeaturedSlots,
  dappPromotedSlots,
  dappRefineStatusOptions,
  dappRefineTabOptions,
  dappSchema,
  dappSocialComponentMap,
  dappSortOptions,
  dappSortOptionsMap,
  dappStatuses,
  daysOfTheWeek,
  dappDefaultPlatform,
  eventCategories,
  eventRefineCategoryOptions,
  feedbackComponentMap,
  homeCollectionSlots,
  homeFeaturedCollections,
  myListLimit,
  platformList,
  platformMap,
  platformSoftware,
  rankingColumns
}
