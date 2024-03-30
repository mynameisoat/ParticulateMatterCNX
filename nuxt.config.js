export default {
  ssr: false,
  components: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'เว็บไซต์สำหรับการตรวจสอบค่าฝุ่นละอองในอากาศในจังหวัดเชียงใหม่',
    htmlAttrs: {
      lang: 'th'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon-app.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      '@/assets/css/font.css',
      'primeflex/primeflex.css',
      '@/assets/css/bg-color.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vuetyped.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://www.primefaces.org/primevue/showcase-v2/#/setup
    [
      'primevue/nuxt', {
          theme: 'tailwind-light',
          ripple: true,    //whether the ripple animation is enabled, defaults to false
          components: ['Avatar','Button','Skeleton','Card','Divider','Menubar','Accordion','AccordionTab','Knob' ],     //an array of components to be registered
          directives: []      //an array of directives to be registered
      }
  ],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/primefaces/primevue/issues/844
    transpile: ['primevue'],
  }
}
