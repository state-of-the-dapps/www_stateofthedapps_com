module.exports = {
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'axios',
      'mixpanel-browser',
      'smoothscroll-polyfill',
      'vue-clickaway',
      'webfontloader'
    ]
  },
  generate: {
    routes: [
      "/"
    ]
  },
  /*
  ** mode: 'spa' is the other option: https://nuxtjs.org/api/configuration-mode
  */
  mode: process.env.MODE || 'universal',
  modules: [
    '@nuxtjs/router',
    ['@nuxtjs/google-analytics', { ua: process.env.GOOGLE_ANALYTICS }]
  ],
  router: {
    saveScrollPosition: true
  },
  css: [
    { src: '~/assets/css/main.scss', lang: 'scss' }
  ],
  env: {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    fullstory: process.env.FULLSTORY || '00000',
    mixpanel: process.env.MIXPANEL || '00000000000000000000000000000000'
  },
  head: {
    title: 'State of the ÐApps - The Curated Collection for Ethereum',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'State of the ÐApps is the curated collection of Decentralized Apps' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      }
    ]
  },
  loading: { color: '#333' },
  plugins: [
    { src: '~/plugins/filters' },
    { src: '~/plugins/mixpanel', ssr: false },
    { src: '~/plugins/webfontloader', ssr: false },
    { src: '~/plugins/smoothscroll-polyfill', ssr: false },
    { src: '~/plugins/fullstory', ssr: false }
  ]
}
