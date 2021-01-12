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
					src: 'https://vod-progressive.akamaized.net/exp=1610488683~acl=%2A%2F1290874808.mp4%2A~hmac=a92395b2df8ca4da1845365018e72841504a02b52eff0733822895f6c3342d75/vimeo-prod-skyfire-std-us/01/821/13/329108842/1290874808.mp4?filename=Lugano+Region+Highlights+-+Short.mp4',
					type: 'video/mp4',
				},
			],
		},
	}),
	mounted() {
		this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
			console.log('onPlayerReady', this)
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
