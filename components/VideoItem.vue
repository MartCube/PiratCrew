<template>
	<client-only>
		<vimeo-player ref="player" :video-id="videoID" :autoplay="true" :controls="false" />
	</client-only>
</template>

<script>
export default {
	props: {
		videoID: {
			type: String,
			default: '500106369',
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
