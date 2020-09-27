<template>
	<div class="gallery">
		<ImageItem v-for="(item, i) in data" :key="'gallery-image' + i" :image-src="item.gallery_image.url" :image-alt="item.gallery_image.alt" />
		<!-- <FsLightbox :toggler="toggler" :sources="['https://i.imgur.com/fsyrScY.jpg', 'https://www.youtube.com/watch?v=xshEZzpS4CQ']" /> -->
	</div>
</template>

<script>
// import FsLightbox from 'fslightbox-vue'
export default {
	// components: { FsLightbox },

	props: {
		data: {
			type: Array,
			required: true,
		},
	},
	data: () => ({
		toggler: true,
	}),
}
</script>

<style lang="scss" scoped>
$grid-gutter-width: 20px;
$row-height: 300px;
$column-count: 4;

.gallery {
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
}

@media (max-width: 600px) {
}
</style>
