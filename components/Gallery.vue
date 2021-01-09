<template>
	<div class="gallery">
		<ImageItem v-for="(item, i) in data" :key="'gallery-image' + i" :image-src="item.gallery_image.url" :image-alt="item.gallery_image.alt" @click.native="Toggle(i)" />
		<!-- <img v-for="(item, i) in data" :key="'gallery-image' + i" :src="item.gallery_image.url" :alt="item.gallery_image.alt" /> -->

		<div v-if="visible" class="lightbox">
			<i class="icon-cancel" @click="Toggle()" />
			<i class="icon-left" :class="{ disable: currentImage == 0 }" @click="Prev()" />
			<i class="icon-right" :class="{ disable: currentImage == data.length - 1 }" @click="Next()" />
			<img class="lazyload" :src="data[currentImage].gallery_image.url" :alt="data[currentImage].gallery_image.alt" />
			<!-- <ImageItem :image-src="data[currentImage].gallery_image.url" :image-alt="data[currentImage].gallery_image.alt" /> -->
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			required: true,
		},
	},
	data: () => ({
		visible: false,
		currentImage: 0,
	}),
	methods: {
		Toggle(index) {
			this.currentImage = index
			this.visible = !this.visible
			if (this.visible) window.addEventListener('keydown', this.onKeydown)
			else window.removeEventListener('keydown', this.onKeydown)
		},
		Next() {
			this.currentImage++
		},
		Prev() {
			this.currentImage--
		},
		onKeydown(e) {
			if (this.visible) {
				switch (e.key) {
					case 'ArrowRight':
						this.Next()
						break
					case 'ArrowLeft':
						this.Prev()
						break
					case 'Escape':
						this.Toggle()
						break
				}
			}
		},
	},
}
</script>

<style lang="scss" scoped>
$grid-gutter-width: 20px;
$row-height: 300px;
$column-count: 4;
$transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);

.gallery {
	margin-top: 4rem;
	max-width: 800px;
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
		&:hover {
			cursor: pointer;
			// transform: scale(1.1);
		}
	}
}

.lightbox {
	display: flex;
	justify-content: center;
	align-items: center;

	z-index: 999;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.85);

	img {
		user-select: none;
		max-width: 90%;
		max-height: 90%;
		&.lazyload,
		&.lazyloading {
			opacity: 0;
		}
		&.lazyloaded {
			opacity: 1;
			transition: $transition;
		}
	}

	i {
		opacity: 0.75;
		&.disable {
			display: none;
		}
	}

	.icon-cancel {
		cursor: pointer;
		font-size: 40px;
		color: #f2f2f2;

		position: fixed;
		top: 0;
		right: 0;
		margin: 10px;

		transition: $transition;
		&:hover {
			transform: scale(1.1);
			opacity: 0.9;
		}
	}
	.icon-left {
		cursor: pointer;
		font-size: 50px;
		color: #f2f2f2;

		position: fixed;
		top: 50;
		left: 0;
		padding: 10px;

		transition: $transition;
		&:hover {
			transform: scale(1.1);
			opacity: 0.9;
		}
	}
	.icon-right {
		cursor: pointer;
		font-size: 50px;
		color: #f2f2f2;

		position: fixed;
		top: 50;
		right: 0;
		padding: 10px;

		transition: $transition;
		&:hover {
			transform: scale(1.1);
			opacity: 0.9;
		}
	}
}

@media (max-width: 600px) {
	.gallery {
		margin: 30px 0;
		max-width: 355px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
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
}
</style>
