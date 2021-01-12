<template>
	<div>
		<Letters v-show="play" @click.native="playVideo" />
		<video ref="videoPlayer" playsinline webkit-playsinline class="video-js"></video>
	</div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
	data: () => ({
		play: false,
		player: null,
		options: {
			autoplay: 'muted',
			controls: false,
			loop: true,
			sources: [
				{
					src: 'small.mp4',
					type: 'video/mp4',
				},
			],
		},
	}),
	watch: {
		play(newValue, oldValue) {
			if (this.play)
				this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
					console.log('onPlayerReady', this)
				})
			else {
				this.player.dispose()
			}
		},
	},
	mounted() {
		this.playVideo()
	},
	beforeDestroy() {
		if (this.player) {
			this.player.dispose()
		}
	},
	methods: {
		playVideo() {
			// this.play = true
			// await this.$nextTick() // wait DOM to render

			this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
				console.log('onPlayerReady', this)
			})
		},
	},
}
</script>

<style lang="scss" scoped>
#vjs_video_3 {
	width: calc(100vw - 80px);
	height: calc(100vh - 80px);
	video {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		transform: translate(-50%, -50%);
		object-fit: cover;
	}
}
</style>
