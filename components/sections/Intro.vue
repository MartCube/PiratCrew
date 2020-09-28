<template>
	<section id="intro" class="intro">
		<video class="lazy" autoplay muted loop playsinline>
				<!-- <source src="one-does-not-simply.webm" type="video/webm"> -->
			<source src="/videoplayback.mp4" type="video/mp4">
		</video>
		<div class="logo">
			<TextBox text="pirat" />
			<TextBox text="crew" />
		</div>
			<div class="bottom-bar"><span></span></div>
		<div class="name"><span>PIRAT CREW DANCE GROUP</span></div>
	</section>
</template>

<script>
import { fadeIn, widthStretch } from '~/assets/anime'


export default {
	data: () => ({}),
	mounted(){
		const LeftText = document.querySelector('.name span')
		const bottomLine = document.querySelector('.bottom-bar span')
		fadeIn(LeftText)
		widthStretch(bottomLine)
		// const video = document.querySelector('video');

		// function checkLoad() {
		// 	if (video.readyState === 4) {
		// 		document.querySelector('.intro video').classList.add("loaded")
		// 		// document.querySelector('.logo').classList.add("loaded")
		// 	} else {
		// 		setTimeout(checkLoad, 100)
		// 	}
		// }

		// checkLoad();
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';
$size: 40px;

.intro {
	width: 100%;
	min-height: 100vh;
	padding: 0;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	background-color: #000;
	overflow: hidden;
	video{
		width: 100vw;
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		transition: opacity .5s 2s;
		&.loaded {
			opacity: 1;
		}
	}
	.logo{
		.text_box {
			align-self: center;	
			text-align: center;
			margin: 2rem 0;	
			h2 {
				font-size: 14em;
			}
		}
	}
	a {
		color: white;
		text-decoration: none;
		font-size: 1em;
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
}

@media (max-width: 600px) {
}
</style>
