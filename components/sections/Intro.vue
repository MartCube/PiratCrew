<template>
	<section id="intro">
		<client-only>
			<video-background src="small.mp4" class="video" />
		</client-only>
	</section>
</template>

<script>
export default {
	data: () => ({}),
	methods: {},
}
</script>

<style lang="scss" scoped>
section {
	padding: 0;
	width: calc(100vw - 80px);
	height: calc(100vh - 80px);
	justify-content: center;
	align-items: center;
	position: relative;
	.video {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		transform: translate(-50%, -50%);
		object-fit: cover;
		.plyr__controls {
			display: none;
		}
	}
}
</style>
