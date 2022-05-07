<template>
	<div id="gallery" class="gallery">
		<CoolLightBox :items="getImagesArray(data)" :index="index" @close="index = null"></CoolLightBox>

		<div class="wrapper">
			<div v-for="(item, i) in data" :key="i" class="image" @click="index = i">
				<ImageItem :src="item.gallery_image.url" :alt="item.gallery_image.alt" />
			</div>
		</div>
	</div>
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
	components: {
		CoolLightBox,
	},
	props: {
		data: {
			type: Array,
			required: true,
		},
	},
	data: () => ({
		index: null,
	}),
	methods: {
		getImagesArray(arr) {
			const imageUrls = []
			arr.forEach((item) => {
				imageUrls.push(item.gallery_image.url)
			})
			// console.log(imageUrls)
			return imageUrls
		},
	},
}
</script>

<style lang="scss" scoped>
$grid-gutter-width: 20px;
$row-height: 300px;
$column-count: 4;
$transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);

.gallery .wrapper {
	margin-top: 4rem;
	width: 100%;
	display: grid;
	grid-template-columns: repeat($column-count, 1fr);
	grid-auto-rows: $row-height;
	grid-auto-flow: row dense;
	grid-gap: $grid-gutter-width;
	div:nth-child(2n) {
		grid-column-end: span 2;
	}
	div:nth-child(3n) {
		grid-row-end: span 2;
	}
	.image {
		transition: all 0.2s linear;
		width: 100%;
		display: flex;
		position: relative;
		&:hover {
			cursor: pointer;
			// transform: scale(1.1);
		}
	}
}

.lightbox {
	display: flex;
	justify-content: space-between;
	align-items: center;

	z-index: 999;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.85);

	svg {
		width: 40px;
		height: 40px;
		margin: 10px;
		fill: white;
		&.disable {
			fill: none;
		}
		cursor: pointer;
		opacity: 0.6;
		transition: $transition;
		&:hover {
			opacity: 0.9;
		}

		&.cancel {
			position: fixed;
			top: 0;
			right: 0;
		}
		&.left {
			transform: rotate(180deg);
		}
	}
	img {
		width: 50%;
	}
}

@media (max-width: 700px) {
	.gallery .wrapper {
		margin: 30px 0;
		max-width: 355px;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-auto-rows: 300px;
		grid-auto-flow: row dense;
		grid-gap: 3px;
		.image {
			width: 100%;
		}
		div:nth-child(2n) {
			grid-column-end: initial;
		}
		div[data-v-74ca56c7]:nth-child(3n) {
			grid-row-end: initial;
		}
	}

	.lightbox {
		svg {
			width: 30px;
			height: 30px;
			z-index: 100;
		}
	}
}
</style>
