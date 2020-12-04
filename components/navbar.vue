<template>
	<div class="navbar" :class="theme">
		<div class="top">
			<div class="logo">
				<n-link to="/">
					<img src="/logo.png" alt="logo" @click="showMenu = false" />
				</n-link>
				<div class="item">
					<p class="text">pirate crew dance group</p>
				</div>
			</div>

			<div class="button" :class="{ active: showMenu }" @click="ToggleMenu">
				<div class="line"></div>
				<div class="line"></div>
				<div class="cancel"></div>
			</div>
		</div>
		<div class="right">
			<template v-for="(item, i) in navigation">
				<div :key="i" class="item">
					<a v-scroll-to="'#' + item" class="text">{{ item }}</a>
				</div>
				<div :key="'line' + i" class="line"></div>
			</template>
		</div>
		<div class="bottom">
			<div class="line"></div>
			<div class="item">
				<p class="text">
					<nuxt-link v-for="locale in availableLocales" :key="locale.code" :class="{ active: locale.code == currentLocale }" class="item" :to="switchLocalePath(locale.code)">
						<span>{{ locale.name }}</span>
					</nuxt-link>
				</p>
			</div>
			<div class="line"></div>
			<div class="item">
				<p class="text year">copy right &copy; {{ year }}</p>
			</div>
		</div>
		<div class="left">
			<div class="line"></div>

			<div class="item">
				<a class="text facebook" href="#">
					<span>facebook</span>
					<i class="icon icon-facebook" />
				</a>
			</div>
			<div class="line"></div>
			<div class="item">
				<a class="text instagram" href="#">
					<span>instagram</span>
					<i class="icon icon-instagram" />
				</a>
			</div>
			<div class="line"></div>
			<div class="item">
				<a class="text youtube" href="#">
					<span>youtube</span>
					<i class="icon icon-youtube" />
				</a>
			</div>
		</div>

		<div v-show="showMenu" class="menu">
			<div class="links" @click="ToggleMenu">
				<n-link to="/"> home</n-link>
				<n-link to="/about"> about</n-link>
				<n-link to="/events"> events</n-link>
				<n-link to="/contact"> contact</n-link>
				<n-link to="/artist"> artist form</n-link>
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
		theme() {
			return this.$store.getters.theme
		},
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
		this.$store.commit('setTheme', 'black')
		await this.$nextTick() // wait DOM to render

		const navbarLogo = document.querySelectorAll('.top .logo img')
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
@import '~/assets/colors.scss';
$size: 40px;

.navbar {
	position: fixed;
	top: 0;
	z-index: 999;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	align-content: center;

	.menu {
		width: 100%;
		height: calc(100vh - 80px);
		margin: 40px;
		z-index: 4;
		background: black;

		display: flex;
		justify-content: center;
		align-items: center;

		.links {
			width: 100%;
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

		z-index: 2;
		background: $bg;
		user-select: none;

		display: flex;
		justify-content: space-between;
		align-items: center;
		.logo {
			display: flex;
			align-items: center;

			padding: 5px;

			img {
				opacity: 0; //anime

				width: 30px;
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
			z-index: 3;
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

		z-index: 2;
		background: $bg;
		user-select: none;

		display: flex;
		justify-content: flex-end;
		align-items: center;
		.item {
			cursor: pointer;
			overflow: hidden;

			.text {
				opacity: 0; //anime
				padding: 2vh;
				&.year {
					padding-right: 0;
				}

				text-transform: uppercase;
				font-size: 12px;
				a {
					text-decoration: none;
					color: white;
				}
				a.active {
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

		z-index: 2;
		background: $bg;
		user-select: none;
		transform: initial;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		.item {
			cursor: pointer;
			padding: 2vh 0;
			overflow: hidden;

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
		background: $bg;
		z-index: 2;
		transform: initial;

		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		align-content: center;

		.item {
			padding: 2vh 0;
			overflow: hidden;
			transform: rotate(180deg);
			.text {
				opacity: 0; //anime
				text-decoration: none;
				font-size: 14px;
				color: white;
				text-transform: uppercase;
				writing-mode: vertical-rl;
				text-orientation: mixed;

				.icon {
					color: white;
					display: none;
				}
				&.facebook:hover {
					color: $facebook;
				}
				&.instagram:hover {
					color: $instagram;
				}
				&.youtube:hover {
					color: $youtube;
				}
			}
			&:last-child {
				padding-top: 0;
			}
			.icon {
				display: none;
				text-decoration: none;
				color: white;
			}
		}
		.line {
			width: 2px;
			height: 0; //anime
			background: #fff;
		}
	}
}

.navbar.white {
	.logo {
		img {
			filter: invert(1);
		}
	}
	.top,
	.right,
	.bottom,
	.left {
		background: #fff;
		.smedias .item .text,
		.text {
			color: black;
			.icon {
				color: black;
			}
		}

		.line,
		.cancel {
			background: #000;
		}
	}
}

@media (max-width: 800px) {
	.navbar .menu {
		.links {
			width: fit-content;
			height: 80%;
			flex-direction: column;
			align-items: flex-start;
		}
	}
}
</style>
