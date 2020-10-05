export default {
	// Target (https://go.nuxtjs.dev/config-target)
	target: 'static',

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'pirate_crew',
		meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
		link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['~/assets/main.scss'],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [{ src: '@/plugins/vee-validate.js' }, { src: `~/plugins/lazysizes.client.js` }],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		// '@nuxtjs/eslint-module',
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: ['vue-scrollto/nuxt', '@nuxtjs/prismic'],

	prismic: {
		endpoint: 'https://piratcrew.cdn.prismic.io/api/v2',
		linkResolver: '@/plugins/link-resolver',
		htmlSerializer: '@/plugins/html-serializer',
		preview: false,
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
		hotMiddleware: {
			client: {
				quiet: true,
			},
		},
		transpile: ['vee-validate/dist/rules'],
		extend(config, { isClient, loaders: { vue } }) {
			if (isClient) {
				vue.transformAssetUrls.img = ['data-src', 'src']
				vue.transformAssetUrls.source = ['data-srcset', 'srcset']
			}
		},
	},

	generate: {
		fallback: '404.html', // Netlify reads a 404.html, Nuxt will load as an SPA
	},
}
