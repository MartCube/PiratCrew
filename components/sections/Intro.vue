<template>
	<div id="intro">
		<Letters :text="video" />
		<!-- eslint-disable-next-line vue/attribute-hyphenation -->
		<client-only> <video-background ref="video" :src="videoPath" playsWhen="canplaythrough" /> </client-only>
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
	data: () => ({}),
	computed: {
		videoPath() {
			return `/videos/${this.video}.mp4`
		},
	},
	methods: {},
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
</style>
