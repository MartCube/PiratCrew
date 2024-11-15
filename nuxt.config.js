export default {
	// Target (https://go.nuxtjs.dev/config-target)
	target: 'static',
	components: ['~/components/forms', '~/components/global', '~/components/items', '~/components/local', '~/components/sections'],

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'PiratCrew',
		meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }],
		link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['~/assets/main.scss'],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [{ src: '~/plugins/responsive-video', mode: 'client' }, { src: '@/plugins/vue-observe' }, { src: '@/plugins/vee-validate.js' }, { src: `~/plugins/lazysizes.client.js` }, { src: `~/plugins/gsap.js` }],

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// '@nuxtjs/eslint-module',
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: ['vue-scrollto/nuxt', '@nuxtjs/prismic', '@nuxtjs/axios', 'nuxt-i18n', '@nuxtjs/sitemap'],

	prismic: {
		endpoint: 'https://piratcrew.cdn.prismic.io/api/v2',
		linkResolver: '@/plugins/link-resolver',
		htmlSerializer: '@/plugins/html-serializer',
		preview: false,
	},

	i18n: {
		defaultLocale: 'en',
		lazy: true,
		langDir: 'locales/',
		locales: [
			{
				code: 'en',
				name: 'EN',
				file: 'en.js',
			},
			{
				code: 'ua',
				name: 'UA',
				file: 'ua.js',
			},
		],
	},

	sitemap: {
		hostname: 'https://piratcrew.com',
		defaults: {
			changefreq: 'yearly',
			priority: 1,
			lastmod: new Date(),
		},
		routes: [
			{
				url: '/shows/jazzdoit',
			},
			{
				url: '/ru/shows/jazzdoit',
			},
			{
				url: '/shows/juzeppe-art-hotel',
			},
			{
				url: '/ru/shows/juzeppe-art-hotel',
			},
			{
				url: '/shows/bon-voyage',
			},
			{
				url: '/ru/shows/bon-voyage',
			},
		],
	},

	axios: {
		baseURL: '/',
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
			vue.transformAssetUrls.img = ['data-src', 'src']
			vue.transformAssetUrls.source = ['data-srcset', 'srcset']

			config.resolve.symlinks = false
		},
	},

	generate: {
		fallback: '404.html', // Netlify reads a 404.html, Nuxt will load as an SPA
	},
}
