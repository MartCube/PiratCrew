<template>
	<div class="navbar" :class="theme">
		<div class="top">
			<n-link to="/" class="logo">
				<img src="/logo.png" alt="logo" />
			</n-link>
			<div class="button" @click="ToggleMenu">
				<div class="line"></div>
				<div class="line"></div>
			</div>
		</div>
		<div class="right">
			<template v-if="theme == 'black'">
				<div class="item">
					<a v-scroll-to="'#intro'" class="text">intro</a>
				</div>
				<div class="line"></div>
				<div class="item">
					<span v-scroll-to="'#about'" class="text">about</span>
				</div>
				<div class="line"></div>
				<div class="item">
					<span v-scroll-to="'#portfolio'" class="text">portfolio</span>
				</div>
				<div class="line"></div>
				<div class="item">
					<span v-scroll-to="'#contact'" class="text">contact</span>
				</div>
			</template>
			<template v-else>
				<div class="item">
					<a v-scroll-to="'#intro'" class="text">intro</a>
				</div>
				<div class="line"></div>
				<div class="item">
					<span v-scroll-to="'.title'" class="text">event</span>
				</div>
				<div class="line"></div>
				<div class="item">
					<span v-scroll-to="'#contact'" class="text">contact</span>
				</div>
			</template>
		</div>
		<div class="bottom">
			<div class="line"></div>
			<div class="item">
				<p class="text">copy right &copy; {{ year }}</p>
			</div>
		</div>
		<div class="left">
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

		<div v-if="isActive" class="menu">
			<div class="links">
				<n-link to="/"> home</n-link>
				<n-link to="/"> about</n-link>
				<n-link to="/"> contact</n-link>
				<n-link to="/"> artist form</n-link>
			</div>

			<div class="events">
				<h2>full show</h2>
				<n-link to="/"> jazz do it</n-link>
				<n-link to="/"> circus art hotel giuseppe</n-link>
				<n-link to="/"> bon voyage</n-link>

				<h2>dinner show</h2>
				<n-link to="/"> circus</n-link>
				<n-link to="/"> jazz</n-link>
				<n-link to="/"> vintage</n-link>

				<h2>private party</h2>
				<n-link to="/">Monaco</n-link>
				<n-link to="/">Queen</n-link>
				<n-link to="/">Dnepr</n-link>
				<n-link to="/">Cruise</n-link>
			</div>

			<div class="cancel" @click="ToggleMenu">
				<div class="line"></div>
				<div class="line"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { navbarTop, navbarBottom, navbarRight, navbarLeft } from '~/assets/anime'

export default {
	data: () => ({
		isActive: false,
	}),
	computed: {
		theme() {
			return this.$store.getters.theme
		},
		year() {
			return new Date().getFullYear()
		},
	},
	watch: {
		async theme(newValue, oldValue) {
			if (oldValue !== newValue) {
				await this.$nextTick() // wait DOM to render
				const navbarLogo = document.querySelectorAll('.top .logo')
				const navbarTopLines = document.querySelectorAll('.top .line')
				navbarTop(navbarLogo, navbarTopLines)

				const navbarRightItems = document.querySelectorAll('.right .item .text')
				const navbarRightLines = document.querySelectorAll('.right .line')
				navbarRight(navbarRightItems, navbarRightLines)

				const navbarBottomItems = document.querySelectorAll('.bottom .item .text')
				const navbarBottomLines = document.querySelectorAll('.bottom .line')
				navbarBottom(navbarBottomItems, navbarBottomLines)

				const navbarLeftItems = document.querySelectorAll('.left .item .text')
				const navbarLeftLines = document.querySelectorAll('.left .line')
				navbarLeft(navbarLeftItems, navbarLeftLines)
			}
		},
	},
	methods: {
		ToggleMenu() {
			this.isActive = !this.isActive
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
			padding: 5px;
			opacity: 0; //anime

			img {
				width: 30px;
			}
		}
		.button {
			margin: 5px;
			height: 30px;
			width: 30px;
			z-index: 3;
			cursor: pointer;
			overflow: hidden;

			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: flex-end;

			.line {
				width: 100%;
				height: 2px;
				background: white;
				opacity: 0; //anime

				&:nth-child(2) {
					width: 80%;
				}
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
			padding-left: 2vh;
			overflow: hidden;

			.text {
				opacity: 0; //anime
				text-transform: uppercase;
				font-size: 12px;
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

	.menu {
		width: 100%;
		height: 100vh;
		z-index: 4;
		background: black;

		display: flex;
		justify-content: space-evenly;
		align-items: center;
		a {
			text-decoration: none;
			color: white;
		}
		.cancel {
			position: fixed;
			top: 0;
			right: 0;
			width: $size;
			height: $size;
			margin: $size;
			cursor: pointer;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			align-content: center;

			.line {
				width: 100%;
				height: 2px;
				background: white;
				transform: translateY(2px) rotate(-45deg);
				&:nth-child(2) {
					transform: rotate(45deg);
				}
			}
			&:hover {
				opacity: 0.75;
			}
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

		.line {
			background: #000;
		}
	}
}

@media (max-width: 600px) {
	.navbar {
		.left .item {
			transform: rotate(0);

			.text {
				span {
					display: none;
				}
				.icon {
					display: inline;
				}
			}

			&:last-child {
				padding-top: 2vh;
				padding-bottom: 0;
			}
		}
	}
}
</style>
