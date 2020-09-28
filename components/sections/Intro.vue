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
	</section>
</template>

<script>
export default {
	data: () => ({}),
	mounted(){
		const video = document.querySelector('video');

		function checkLoad() {
			if (video.readyState === 4) {
				document.querySelector('.intro video').classList.add("loaded")
				document.querySelector('.logo').classList.add("loaded")
			} else {
				setTimeout(checkLoad, 100)
			}
		}

		checkLoad();
	},
}
</script>

<style lang="scss" scoped>
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
		transition: 5.5s opacity .5s ;
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
		transition: 2.5s opacity .5s;
		opacity: 1;
		&.loaded{
			opacity: 0;
		}

	}
}

@media (max-width: 600px) {
}
</style>
