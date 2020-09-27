<template>
	<div class="image">
		<picture>
			<source :data-srcset="imageSrc + '&fit=crop&w=400&h=500'" media="(max-width: 500px)" />
			<img :data-src="imageSrc" class="lazyload" :alt="imageAlt" />
		</picture>
		<div class="box"></div>
	</div>
</template>

<script>
export default {
	props: {
		imageSrc: {
			type: String,
			required: true,
		},
		imageAlt: {
			type: String,
			required: true,
		},
	},
	methods: {},
}
</script>

<style lang="scss" scoped>
.image {
	max-width: 500px;
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	img {
		width: 100%;
		height: 100%;
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
	.box {
		display: none;
		z-index: -1;
		position: absolute;
		bottom: -20px;
		right: -20px;

		width: 100%;
		height: 100%;
		border: 1px solid white;
	}
}
</style>
