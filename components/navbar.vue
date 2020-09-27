<template>
	<div class="navbar">
		<!-- <svg class="menu_btn" viewBox="0 0 512 512" @click="menuAnim">
			<circle cx="256" cy="256" r="40.23" class="w_circle" />
			<circle cx="421.77" cy="416.77" r="40.23" class="w_circle" />
			<circle cx="90.23" cy="416.77" r="40.23" class="w_circle" />
			<circle cx="421.77" cy="90.23" r="40.23" class="w_circle" />
			<circle cx="90.23" cy="90.23" r="40.23" class="w_circle" />
			<circle cx="170.73" cy="175.5" r="40.23" class="x_circle" />
			<circle cx="336.73" cy="175.5" r="40.23" class="x_circle" />
			<circle cx="336.73" cy="336.5" r="40.23" class="x_circle" />
			<circle cx="170.73" cy="336.5" r="40.23" class="x_circle" />
			<circle cx="256" cy="416.77" r="40.23" class="p_circle" />
			<circle cx="256" cy="90.23" r="40.23" class="p_circle" />
			<circle cx="421.77" cy="256" r="40.23" class="p_circle" />
			<circle cx="90.23" cy="256" r="40.23" class="p_circle" />
		</svg> -->
		<div class="social_medias">
			<span class="item facebook">facebook</span>
			<span class="item instagram">instagram</span>
			<span class="item youtube">youtube</span>
		</div>
		<div class="links">
			<span v-scroll-to="'#intro'" class="item">home</span>
			<span v-scroll-to="'#portfolio'" class="item">portfolio</span>
			<span v-scroll-to="'#about'" class="item">about</span>
			<span v-scroll-to="'#contact'" class="item">contact</span>
		</div>
	</div>
</template>

<script>
import { menuAnim } from '~/assets/anime'

export default {
	data: () => ({
		menuActive: false,
	}),
	methods: {
		menuAnim() {
			const circles = document.querySelectorAll('.menu_btn circle')
			const circlesW = document.querySelectorAll('.w_circle')
			const circlesX = document.querySelectorAll('.x_circle')
			const circlesP = document.querySelectorAll('.p_circle')
			this.menuActive = !this.menuActive
			menuAnim(circles, circlesW, circlesX, circlesP, this.menuActive)
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

	a {
		color: white;
		text-decoration: none;
		font-size: 1em;
	}

	.social_medias {
		position: fixed;
		right: 0;
		top: 0;
		width: 100%;
		height: $size;
		padding: $size/2;
		background: $bg;
		user-select: none;

		display: flex;
		justify-content: flex-end;
		align-items: center;
		align-content: center;
		.item {
			cursor: pointer;
			margin: 0 $size;
			text-transform: uppercase;

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
	}
	.links {
		user-select: none;
		position: fixed;
		right: 0;
		bottom: 0;
		height: 100%;
		background: $bg;
		padding: $size/2;

		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		align-content: center;
		.item {
			cursor: pointer;
			margin: $size 0;
			text-transform: uppercase;
			writing-mode: vertical-rl;
			text-orientation: mixed;
			&:hover {
				opacity: 0.75;
			}
		}
	}
	.menu_btn {
		width: $size;
		height: $size;
		margin: $size/2;
		circle {
			fill: white;
		}
		.x_circle {
			opacity: 0;
		}
		cursor: pointer;
	}
}
</style>
