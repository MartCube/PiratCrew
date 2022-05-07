<template>
	<div class="navbar">
		<div class="top">
			<n-link class="logo" :to="localePath('index')" @click.native="showMenu = false">
				<ImageItem src="/logo.png" width="30" height="30" alt="logo" />

				<div class="item">
					<p class="text">pirat crew dance acrobatic theater</p>
				</div>
			</n-link>

			<div class="button" :class="{ active: showMenu }" @click="ToggleMenu">
				<div class="line" />
				<div class="line" />
				<div class="cancel" />
			</div>
		</div>
		<div class="right">
			<template v-for="(item, i) in navigation">
				<div :key="i" v-scroll-to="'#' + item.value" class="item">
					<span class="text">{{ item.text }}</span>
				</div>
				<div :key="'line' + i" class="line" />
			</template>
		</div>
		<div class="bottom">
			<div class="line" />
			<div class="item">
				<nuxt-link v-for="locale in availableLocales" :key="locale.code" class="text" :class="{ active: locale.code == currentLocale }" :to="switchLocalePath(locale.code)">
					{{ locale.name }}
				</nuxt-link>
			</div>
			<div class="line" />
			<div class="item">
				<p class="text year">copy right &copy; {{ year }}</p>
			</div>
		</div>
		<div class="left">
			<div class="line" />
			<div class="item">
				<a class="text" target="blank" rel="nofollow" href="https://www.facebook.com/piratcrewshow/"> facebook </a>
			</div>
			<div class="line" />
			<div class="item">
				<a class="text" target="blank" rel="nofollow" href="https://www.instagram.com/piratcrew/"> instagram </a>
			</div>
			<div class="line" />
			<div class="item">
				<a class="text" target="blank" rel="nofollow" href="https://www.youtube.com/channel/UCJjlUOVeQyATgVOqGss6C_Q"> youtube </a>
			</div>
		</div>

		<div v-show="showMenu" class="menu">
			<div class="links" @click="ToggleMenu">
				<n-link :to="localePath('/about')"> {{ $t('pages.about') }}</n-link>
				<!-- <n-link :to="localePath('/events')"> {{ $t('pages.events') }}</n-link> -->
				<n-link :to="localePath('/shows')"> {{ $t('pages.shows.name') }}</n-link>
				<n-link :to="localePath('/casting')"> {{ $t('pages.casting') }}</n-link>
				<n-link :to="localePath('/contact')"> {{ $t('pages.contact') }}</n-link>
			</div>
		</div>
	</div>
</template>

<script>
import { navbarTop, navbarBottom, navbarRight, navbarLeft, navbarMenu } from '~/assets/anime'

export default {
	data: () => ({
		showMenu: false,
	}),
	computed: {
		navigation() {
			return this.$store.getters.navigation
		},
		year() {
			return new Date().getFullYear()
		},
		availableLocales() {
			return this.$i18n.locales
		},
		currentLocale() {
			return this.$i18n.locale
		},
	},
	watch: {
		async navigation(newValue, oldValue) {
			await this.$nextTick() // wait DOM to render
			const navbarRightItems = document.querySelectorAll('.right .item .text')
			const navbarRightLines = document.querySelectorAll('.right .line')
			navbarRight(navbarRightItems, navbarRightLines)
		},
		async currentLocale(newValue, oldValue) {
			await this.$nextTick() // wait DOM to render
			const navbarBottomItems = document.querySelectorAll('.bottom .item .text')
			const navbarBottomLines = document.querySelectorAll('.bottom .line')
			navbarBottom(navbarBottomItems, navbarBottomLines)
		},
		showMenu(newValue, oldValue) {
			if (!newValue) return
			const links = document.querySelectorAll('.navbar .menu .links a')
			navbarMenu(links)
		},
	},
	async mounted() {
		await this.$nextTick() // wait DOM to render

		const navbarLogo = document.querySelectorAll('.top .logo picture')
		const navbarTopText = document.querySelectorAll('.top .logo .item .text')
		const navbarTopLines = document.querySelectorAll('.top  .line')
		navbarTop(navbarLogo, navbarTopLines, navbarTopText)

		const navbarRightItems = document.querySelectorAll('.right .item .text')
		const navbarRightLines = document.querySelectorAll('.right .line')
		navbarRight(navbarRightItems, navbarRightLines)

		const navbarBottomItems = document.querySelectorAll('.bottom .item .text')
		const navbarBottomLines = document.querySelectorAll('.bottom .line')
		navbarBottom(navbarBottomItems, navbarBottomLines)

		const navbarLeftItems = document.querySelectorAll('.left .item .text')
		const navbarLeftLines = document.querySelectorAll('.left .line')
		navbarLeft(navbarLeftItems, navbarLeftLines)
	},
	methods: {
		ToggleMenu() {
			this.showMenu = !this.showMenu
		},
	},
}
</script>

<style lang="scss" scoped>
$size: 40px;

.navbar {
	position: fixed;
	top: 0;
	z-index: 99;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	align-content: center;

	.menu {
		width: 100%;
		height: calc(100vh - 80px);
		margin: 40px;
		background: black;

		display: flex;
		justify-content: center;
		align-items: center;

		.links {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			a {
				opacity: 0; //anime
				width: fit-content;
				text-decoration: none;
				color: white;
				font-size: 2em;
				text-transform: uppercase;

				&::after {
					content: '';
					display: block;
					width: 2px;
					height: 0px;
					background: white;

					transition: all 0.35s cubic-bezier(0.33, 1, 0.68, 1);
				}
				transition: all 0.35s cubic-bezier(0.33, 1, 0.68, 1);

				&:hover {
					opacity: 0.75;
					&:after {
						height: 80px;
					}
				}

				&.nuxt-link-exact-active {
					opacity: 0.75;
					&:after {
						height: 80px;
					}
				}
			}
		}
	}

	.top {
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		height: $size;
		padding: 0 $size;

		background: black;
		user-select: none;

		display: flex;
		justify-content: space-between;
		align-items: center;
		.logo {
			display: flex;
			align-items: center;

			padding: 5px;
			text-decoration: none;
			color: white;
			picture {
				opacity: 0; //anime
				width: 30px;
				height: 30px;
				margin-right: 15px;
			}
			.item {
				overflow: hidden;
				.text {
					opacity: 0; //anime
					text-transform: uppercase;
					font-size: 14px;
				}
			}
		}
		.button {
			margin: 5px;
			height: 30px;
			width: 30px;
			cursor: pointer;

			position: relative;
			overflow: hidden;

			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			transition: all 0.35s cubic-bezier(0.33, 1, 0.68, 1);
			&.active {
				.cancel {
					opacity: 1;
					top: 12px;
					transform: rotate(50deg);
				}
			}
			.cancel {
				position: absolute;
				top: 0;
				width: 100%;
				height: 2px;
				background: white;
				transform: rotate(0deg);
				opacity: 0;
				transition: all 0.35s cubic-bezier(0.33, 1, 0.68, 1);
			}
			.line {
				width: 0; //anime
				height: 2px;
				background: white;
			}
		}
	}
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: $size;
		padding: 0 $size;

		background: black;
		user-select: none;

		display: flex;
		justify-content: flex-end;
		align-items: center;
		.item {
			height: $size;
			overflow: hidden;
			cursor: pointer;
			display: flex;
			justify-content: center;

			.text {
				opacity: 0; //anime
				padding: 2vh;

				text-transform: uppercase;
				font-size: 12px;

				display: block;
				text-decoration: none;
				color: white;

				&.year {
					padding-right: 0;
				}
				&.active {
					display: none;
				}
			}
		}
		.line {
			width: 0; //anime
			height: 2px;
			background: #fff;
			display: block;
		}
	}
	.right {
		position: fixed;
		right: 0;
		bottom: 0;
		width: $size;
		height: 100%;
		padding: $size 0;

		background: black;
		user-select: none;
		transform: initial;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		.item {
			width: $size;
			padding: 2vh 0;
			overflow: hidden;
			cursor: pointer;

			display: flex;
			justify-content: center;

			.text {
				opacity: 0; //anime
				text-transform: uppercase;
				writing-mode: vertical-rl;
				text-orientation: mixed;
				font-size: 14px;
			}
			&:first-child {
				padding-top: 0;
			}
			&:hover {
				opacity: 0.75;
			}
		}
		.line {
			width: 2px;
			height: 0; //anime
			background: #fff;
		}
	}
	.left {
		position: fixed;
		left: 0;
		bottom: 0;
		width: $size;
		height: 100%;
		padding: $size 0;

		user-select: none;
		background: black;
		transform: initial;

		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		align-content: center;

		.item {
			width: $size;
			padding: 2vh 0;
			overflow: hidden;
			transform: rotate(180deg);

			display: flex;
			justify-content: center;
			.text {
				opacity: 0; //anime
				text-decoration: none;
				font-size: 14px;
				color: white;
				text-transform: uppercase;
				writing-mode: vertical-rl;
				text-orientation: mixed;
			}
			&:hover {
				opacity: 0.75;
			}
			&:last-child {
				padding-top: 0;
			}
		}
		.line {
			width: 2px;
			height: 0; //anime
			background: #fff;
		}
	}
}

@media (max-width: 800px) {
	.navbar {
		.menu .links {
			width: fit-content;
			height: 80%;
			flex-direction: column;
			align-items: flex-start;

			a {
				&:hover {
					opacity: initial;
					&:after {
						height: initial;
					}
				}
				&:focus {
					opacity: 0.75;
					&:after {
						height: 80px;
					}
				}
				&.nuxt-link-active,
				&.nuxt-link-exact-active {
					opacity: 0.75;
					&:after {
						height: 80px;
					}
				}
			}
		}
		.top,
		.right,
		.bottom,
		.left {
			.logo .item .text {
				font-size: 12px;
			}

			.item .text {
				font-size: 12px;
			}
		}
	}
}
</style>
