<template>
	<div class="navbar" :class="theme">
		<div class="top">
			<n-link to="/" class="logo">
				<img src="/logo.png" alt="logo" />
			</n-link>
			<div class="smedias">
				<div class="item">
					<a class="text facebook" href="#">facebook</a>
				</div>
				<div class="line"></div>
				<div class="item facebook">
					<a class="text instagram" href="#">instagram</a>
				</div>
				<div class="line"></div>
				<div class="item facebook">
					<a class="text youtube" href="#">youtube</a>
				</div>
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
		</div>
		<div class="left">
			<div class="item">
				<span class="text">pirat crew dance group</span>
			</div>
		</div>
	</div>
</template>

<script>
import { navbarTop, navbarBottom, navbarRight, navbarLeft } from '~/assets/anime'

export default {
	data: () => ({}),
	computed: {
		theme() {
			return this.$store.getters.theme
		},
	},
	watch: {
		async theme(newValue, oldValue) {
			if (oldValue !== newValue) {
				await this.$nextTick() // wait DOM to render
				const navbarTopItems = document.querySelectorAll('.top .item .text')
				const navbarTopLines = document.querySelectorAll('.top .line')
				navbarTop(navbarTopItems, navbarTopLines)

				const navbarRightItems = document.querySelectorAll('.right .item .text')
				const navbarRightLines = document.querySelectorAll('.right .line')
				navbarRight(navbarRightItems, navbarRightLines)

				const navbarBottomLines = document.querySelectorAll('.bottom .line')
				navbarBottom(navbarBottomLines)

				const navbarLeftItems = document.querySelectorAll('.left .item .text')
				navbarLeft(navbarLeftItems)
			}
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

		z-index: 3;
		background: $bg;
		user-select: none;

		display: flex;
		justify-content: space-between;
		align-items: center;
		.logo {
			display: flex;
			margin-top: 2px;
			margin-left: 2px;
			img {
				width: 38px;
				// opacity: 0;	//anime
			}
		}
		.smedias {
			display: flex;
			justify-content: space-between;
			align-items: center;

			padding-right: $size;
			.item {
				padding: 0 2vw;
				cursor: pointer;
				overflow: hidden;
				.text {
					opacity: 0; //anime
					display: block;
					color: white;
					text-decoration: none;
					text-transform: uppercase;
					font-size: 14px;

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
					padding-right: 0;
				}
			}
			.line {
				width: 0; //anime
				height: 1.5px;

				background: #fff;
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
		.line {
			width: 0; //anime
			height: 1.5px;
			margin-top: $size / 2;
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
		justify-content: flex-end;
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
			&:last-child {
				padding-bottom: 0;
			}
			&:hover {
				opacity: 0.75;
			}
		}
		.line {
			width: 1.5px;
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
			overflow: hidden;
			transform: rotate(180deg);
			.text {
				opacity: 0; //anime
				font-size: 14px;
				text-transform: uppercase;
				writing-mode: vertical-rl;
				text-orientation: mixed;
			}
		}
	}

	&.hide {
		.bottom {
			transform: translateY(100%);
		}
		.left {
			transform: translateX(-100%);
		}
		.bottom,
		.left {
			opacity: 0;
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
		}

		.line {
			background: #000;
		}
	}
}
</style>
