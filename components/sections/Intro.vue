<template>
	<div id="intro">
		<span v-if="info" class="watch_video">{{ $t('pages.shows.clickToWatch') }}</span>
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
		info: {
			type: Boolean,
			default: true,
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
	.watch_video {
		cursor: pointer;
		position: absolute;
		z-index: 3;
		left: 50%;
		transform: translateX(-50%);
		top: 2rem;
		color: #fff;
		opacity: 0;
		animation: fadeIn 0.4s linear 2s 1 forwards;
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
