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
			<span class="item facebook">facebook
				<span></span>
			</span>
			<span class="item instagram">instagram
				<span></span>
			</span>
			<span class="item youtube">youtube
				<span></span>
			</span>
		</div>
		<div class="links">
			<span v-scroll-to="'#intro'" class="item">home
				<span></span>
			</span>
			<span v-scroll-to="'#portfolio'" class="item">portfolio
				<span></span>
			</span>
			<span v-scroll-to="'#about'" class="item">about
				<span></span>
			</span>
			<span v-scroll-to="'#contact'" class="item">contact
				<span></span>
			</span>
		</div>
		<div class="bottom-bar"><span></span></div>
		<div class="name"><span>PIRAT CREW DANCE GROUP</span></div>
	</div>
</template>

<script>
import { menuAnim, navBarAnim } from '~/assets/anime'

export default {
	data: () => ({
		menuActive: false,
	}),
	mounted(){
		const navbarItems = document.querySelectorAll('.social_medias .item')
		navBarAnim(navbarItems)
	},
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
	.social_medias, .links, .bottom-bar, .name {
		position: fixed;
	}
	.social_medias {
		right: 0;
		top: 0;
		width: 100%;
		height: $size;
		padding: $size / 4;
		background: $bg;
		z-index: 1;
		user-select: none;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		align-content: center;
		.item {
			cursor: pointer;
			padding: 0 3.5vw;
			opacity: 0;
			text-transform: uppercase;
			font-size: 14px;
			position: relative;
			&:first-child{
				span{display: none;}
			}
			&:last-child{
				padding-right: 2rem;
			}
			span{
				content: '';
				position: absolute;
				left: -2vw;
				top: 4px;
				display: block;
				height: 1.5px;
				width: 4vw;
				background-color: #fff;
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
	}
	.links {
		user-select: none;
		right: 0;
		bottom: 0;
		height: 100%;
		background: $bg;
		z-index: 2;
		padding: $size/2;
		width: 40px;

		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		align-content: center;
		.item {
			cursor: pointer;
			padding: 3.5vw 0;
			position: relative;
			text-transform: uppercase;
			writing-mode: vertical-rl;
			text-orientation: mixed;
			font-size: 14px;
			&:hover {
				opacity: 0.75;
			}
			&:first-child{
				span{display: none;}
			}
			&:last-child{
				padding-bottom: 0;
			}
			span{
				content: '';
				position: absolute;
				top: -2vw;
				left: 6px;
				display: block;
				width: 1.5px;
				height: 4vw;
				background-color: #fff;
			}
		}
	}
	.name {
		user-select: none;
		left: 0;
		bottom: 0;
		height: 100%;
		background: $bg;
		z-index: 2;
		padding: $size/2;
		width: 40px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		padding: 3.5vw 0 $size/2;
		text-transform: uppercase;
		writing-mode: vertical-rl;
		text-orientation: mixed;
		font-size: 14px;
		span{
			transform: rotateZ(180deg);
		}
	}
	.bottom-bar{
		padding: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		background-color: #000;
		height: 40px;
		span{
			width: 20%;
			margin-left: $size;
			height: 1.5px;
			margin-top: $size / 2;
			background-color: #fff;
			display: block;
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
