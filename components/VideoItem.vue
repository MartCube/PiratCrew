<template>
	<div>
		<video ref="videoPlayer" playsinline webkit-playsinline class="video-js"></video>
	</div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
	data: () => ({
		player: null,
		options: {
			autoplay: 'muted',
			controls: false,
			loop: true,
			sources: [
				{
					src: '//vjs.zencdn.net/v/oceans.mp4',
					type: 'video/mp4',
				},
			],
		},
	}),
	mounted() {
		this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
			console.log('onPlayerReady', this)
			this.player.play()
		})
	},
	beforeDestroy() {
		this.player.dispose()
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
