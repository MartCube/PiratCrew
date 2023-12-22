<template>
	<div id="intro">
		<figure class="sound">
			<svg v-if="sound" viewBox="0 0 256 256" @click="toggleSound()"><path fill="currentColor" d="M154.64 26.61a6 6 0 0 0-6.32.65L77.94 82H32a14 14 0 0 0-14 14v64a14 14 0 0 0 14 14h45.94l70.38 54.74A6 6 0 0 0 158 224V32a6 6 0 0 0-3.36-5.39M146 211.73l-62.32-48.47A6 6 0 0 0 80 162H32a2 2 0 0 1-2-2V96a2 2 0 0 1 2-2h48a6 6 0 0 0 3.68-1.26L146 44.27ZM198 104v48a6 6 0 0 1-12 0v-48a6 6 0 0 1 12 0m32-16v80a6 6 0 0 1-12 0V88a6 6 0 0 1 12 0" /></svg>
			<svg v-else viewBox="0 0 256 256" @click="toggleSound()"><path fill="currentColor" d="M188 152v-48a4 4 0 0 1 8 0v48a4 4 0 0 1-8 0m36-68a4 4 0 0 0-4 4v80a4 4 0 0 0 8 0V88a4 4 0 0 0-4-4m-13 129.31a4 4 0 1 1-5.92 5.38l-49-53.94V224a4 4 0 0 1-2.24 3.59a3.92 3.92 0 0 1-1.84.41a4.07 4.07 0 0 1-2.46-.84L78.63 172H32a12 12 0 0 1-12-12V96a12 12 0 0 1 12-12h50.59L45 42.69a4 4 0 0 1 6-5.38ZM148 156L89.87 92H32a4 4 0 0 0-4 4v64a4 4 0 0 0 4 4h48a4.06 4.06 0 0 1 2.46.84l65.54 51Zm-33.39-89.8l33.39-26v66.65a4 4 0 0 0 8 0V32a4 4 0 0 0-6.46-3.16l-39.85 31a4 4 0 1 0 4.92 6.31Z" /></svg>
			<audio ref="audioEl" controls src="/piratcrew-intro.mp3" autoplay loop></audio>
		</figure>
		<Letters :text="video" />
		<client-only>
			<video-background ref="video" :src="videoPath" plays-when="canplaythrough" />
		</client-only>
	</div>
</template>

<script>
export default {
	props: {
		video: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		sound: true,
	}),
	computed: {
		videoPath() {
			return `/videos/${this.video}.mp4`
		},
	},
	methods: {
		toggleSound() {
			this.sound = !this.sound
			const a = this.$refs.audioEl
			if (a.paused) {
				a.play()
			} else {
				a.pause()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
#intro {
	padding: 0;
	width: calc(100vw - 80px);
	height: calc(100vh - 80px);

	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;
	.sound {
		cursor: pointer;
		position: absolute;
		z-index: 3;
		left: 50%;
		transform: translateX(-50%);
		top: 2rem;
		color: #fff;
		opacity: 0;
		animation: fadeIn 0.4s linear 2s 1 forwards;

		audio {
			display: none;
		}
		svg {
			width: 2rem;
			height: 2rem;
		}
	}
	.vue-responsive-videobg {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		padding: 0;
		transform: translate(-50%, -50%);
		object-fit: cover;
	}
}
@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>
