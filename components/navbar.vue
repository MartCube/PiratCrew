<template>
	<div class="navbar" v-on:scroll="scrollFunction">
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
			<a href="/" class="logo">
				<img src="/logo.png" alt="">
			</a>
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
			<span v-scroll-to="'#about'" class="item">about
				<span></span>
			</span>
			<span v-scroll-to="'#portfolio'" class="item">portfolio
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
import { menuAnim, navBarAnimHorizontal, navBarAnimVertical, fadeIn, widthStretch} from '~/assets/anime'

export default {
	data: () => ({
		menuActive: false,
	}),
	mounted(){
		window.addEventListener('scroll', this.scrollFunction)
		const navbarItemsHorizontal = document.querySelectorAll('.social_medias .item')
		const navbarItemsLineHorizontal = document.querySelectorAll('.social_medias .item span')
		const logo = document.querySelector('.logo img')
	
		const navbarItemsVertical = document.querySelectorAll('.links .item')
		const navbarItemsLineVertical = document.querySelectorAll('.links .item span')
		fadeIn(logo)

		const LeftText = document.querySelector('.name span')
		const bottomLine = document.querySelector('.bottom-bar span')
		fadeIn(LeftText)
		widthStretch(bottomLine)

	console.log(navbarItemsHorizontal,navbarItemsLineHorizontal);
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
		scrollFunction(e){
			let navbar = document.querySelector(".navbar");
			let scrollTop = Math.floor(window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop, 0);
			if(scrollTop > 200){
				navbar.classList.add("hide")
			}
			else if(scrollTop < 200) {
				navbar.classList.remove("hide")
			}
			// console.log(scrollTop);
		}
	},
	destroyed(){
		window.removeEventListener('scroll', this.scrollFunction)

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
		transition: all .2s linear;

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
			margin-top: 2px;
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
			text-transform: uppercase;
			opacity: 0;
			font-size: 14px;
			position: relative;
			&:first-child{
				span{display: none;}
			}
			&:last-child{
				padding-right: $size / 4;
			}
			span{
				position: absolute;
				left: -2vw;
				top: 4px;
				display: block;
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
		transform: initial;
		height: 100%;
		background: $bg;
		z-index: 2;
		padding: $size/2 $size/4;
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
	.bottom-bar, .name {
		position: fixed;
		line-height: 40px;
	}
	.name {
		user-select: none;
		left: 0;
		bottom: 0;
		height: 100%;
		background: $bg;
		z-index: 2;
		padding: $size/2;
		transform: initial;

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
			opacity: 0;
		}
	}
	.bottom-bar{
		padding: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
		transform: translateY(0);
		width: 100%;
		background-color: #000;
		height: 40px;
		span{
			width: 0;
			margin-left: $size;
			height: 1.5px;
			margin-top: $size / 2;
			background-color: #fff;
			display: block;
		}
	}

	&.hide{
		.bottom-bar{
			transform: translateY(100%);
		} 
		.name {
			transform: translateX(-100%);
		}
		.bottom-bar, .name {
			opacity: 0;
		}
	}
}
.white{
	.navbar{
		.logo{
			img{
				filter: invert(1);
			}
		}
		.bottom-bar{
			span{
				background-color: #000;
			}
		}
		.social_medias, .links,.bottom-bar, .name {
			background-color: #fff;
			color: #000;	
			.item {
				span{
					background-color: #000;
				}
			}
		}
	}
}

.event{ 
	.navbar{
		&.hide {
			.links{ 
				transform: translateX(100%);
			}
		}
		.links{
			color: #fff;
			.item{opacity: 0;
				span {display: none;}
			}
		} 
	} 
		
}
</style>
