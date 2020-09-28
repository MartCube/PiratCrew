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
			<div class="logo">
				<img src="/logo.png" alt="">
			</div>
			<div class="wrapper">
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
	
	</div>
</template>

<script>
import { menuAnim, navBarAnimHorizontal, navBarAnimVertical, fadeIn} from '~/assets/anime'

export default {
	data: () => ({
		menuActive: false,
	}),
	mounted(){
		const navbarItemsHorizontal = document.querySelectorAll('.social_medias .item')
		const navbarItemsLineHorizontal = document.querySelectorAll('.social_medias .item span')
		const logo = document.querySelector('.logo img')
	
		const navbarItemsVertical = document.querySelectorAll('.links .item')
		const navbarItemsLineVertical = document.querySelectorAll('.links .item span')
		fadeIn(logo)

		navBarAnimHorizontal(navbarItemsHorizontal, navbarItemsLineHorizontal)
		navBarAnimVertical(navbarItemsVertical, navbarItemsLineVertical)
		
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
		line-height: 40px;
	}
	.social_medias {
		right: 0;
		top: 0;
		width: 100%;
		height: $size;
		padding: 10px 10px 10px 0;
		background: $bg;
		z-index: 3;
		user-select: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		.logo{
			display: flex;
			margin-top: 5px;
			margin-left: 2px;
			img{
				width: 38px;
				opacity: 0;
			}
		}
		.item {
			cursor: pointer;
			padding: 0 3.5vw;
			align-self: flex-end;
			opacity: 0;
			text-transform: uppercase;
			font-size: 14px;
			position: relative;
			&:first-child{
				span{display: none;}
			}
			&:last-child{
				padding-right: $size / 4;
			}
			span{
				content: '';
				position: absolute;
				left: -2vw;
				top: 4px;
				display: block;
				// opacity: 0;
				height: 1.5px;
				width: 0;
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
			opacity: 0;
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
				left: $size / 2;
				display: block;
				width: 1.5px;
				height: 0;
				background-color: #fff;
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
