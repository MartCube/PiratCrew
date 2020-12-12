<template>
	<div class="image">
		<picture>
			<source :data-srcset="imageSrc" media="(max-width: 500px)" />
			<img :data-src="imageSrc" class="lazyload" :alt="imageAlt" />
		</picture>
		<div v-if="box" class="box"></div>
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
		box: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		imgIX_mobile: '&fit=crop&w=500&dpr=1',
		imgIX: '&fit=crop&w=500&dpr=2',
		thumbnail_imgIX: '',
	}),
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
	.box {
		z-index: 1;
		position: absolute;
		bottom: -20px;
		right: -20px;

		width: 100%;
		height: 100%;
		border: 2px solid white;
	}
}

@media (max-width: 600px) {
	.image {
		width: 80%;
		margin: 0 0 4rem 0rem;
		.box {
			bottom: -11px;
			right: 11px;
		}
	}
	.event {
		&.reverse {
			.image {
				.box {
					bottom: -11px;
					left: 11px;
					right: initial;
				}
			}
		}
	}
}
</style>
