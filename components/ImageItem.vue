<template>
	<picture>
		<source :data-srcset="src + imgIXMobile" media="(max-width: 800px)" />
		<img :data-src="src + imgIX" class="lazyload" :style="{ maxWidth: width + 'px', height: height + 'px' }" :alt="alt" />
	</picture>
</template>

<script>
export default {
	props: {
		width: {
			type: String,
			default: '100%',
		},
		height: {
			type: String,
			default: '100%',
		},
		src: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			required: true,
		},
		box: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		imgIX() {
			return `&fit=crop&w=${this.width}&h=${this.height}&dpr=1`
		},
		imgIXMobile() {
			return `&fit=crop&w=${this.width}&h=${this.height}&dpr=2`
		},
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
img {
	width: 100%;
	height: 100%;
	z-index: 3;
	position: relative;
	object-fit: cover;
	object-position: center;

	&.lazyload,
	&.lazyloading {
		opacity: 0;
	}
	&.lazyloaded {
		opacity: 1;
		transition: all 2s cubic-bezier(0.215, 0.61, 0.355, 1);
	}
}
</style>
