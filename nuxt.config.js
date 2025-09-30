export default defineNuxtConfig({
	compatibilityDate: '2025-09-29',

	components: [
		{
			path: '~/components',
			pathPrefix: false
		}
	],

	// Global page headers
	app: {
		head: {
			title: 'PiratCrew',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ hid: 'description', name: 'description', content: '' }
			],
			link: [
				{ rel: 'icon', type: 'image/png', href: '/favicon.png' }
			]
		}
	},

	// Global CSS
	css: ['~/assets/main.scss'],

	// Plugins (нова структура для Nuxt 3)
	plugins: [
		// '~/plugins/responsive-video.js',
		// '~/plugins/vue-observe.js',
		'~/plugins/vee-validate.js',
		'~/plugins/lazysizes.client.js',
		'~/plugins/gsap.js'
	],

	// Modules
	modules: [
		'@nuxtjs/prismic',
		'@nuxtjs/i18n',
		'@nuxtjs/sitemap',
		'@vueuse/nuxt'
	],

	// Prismic
	prismic: {
		endpoint: 'https://piratcrew.cdn.prismic.io/api/v2',
		linkResolver: '@/plugins/link-resolver',
		htmlSerializer: '@/plugins/html-serializer',
		preview: false,
	},

	// i18n
	i18n: {
		strategy: 'no_prefix',
		defaultLocale: 'en',
		lazy: true,
		langDir: 'locales',
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

	// Sitemap
	sitemap: {
		hostname: 'https://piratcrew.com',
		defaults: {
			changefreq: 'yearly',
			priority: 1,
			lastmod: new Date(),
		},
		routes: [
			'/shows/jazzdoit',
			'/ua/shows/jazzdoit',
			'/shows/juzeppe-art-hotel',
			'/ua/shows/juzeppe-art-hotel',
			'/shows/bon-voyage',
			'/ua/shows/bon-voyage'
		],
	},

	// SCSS
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/mixins.scss" as *;'
				}
			}
		}
	},

	// Build транспайлінг для vee-validate
	build: {
		transpile: ['vee-validate']
	}
})