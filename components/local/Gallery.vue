<template>
	<div class="gallery">
		<div v-for="(item, i) in data" :key="'gallery-image' + i" class="image">
			<ImageItem :src="item.gallery_image.url" :alt="item.gallery_image.alt" @click.native="Toggle(i)" />
		</div>

		<div v-if="visible" class="lightbox">
			<svg class="cancel" viewBox="0 0 24 24" @click="Toggle()">
				<path d="M22,4,20,2l-8,8L4,2,2,4l8,8L2,20l2,2,8-8,8,8,2-2-8-8Z" />
			</svg>

			<svg class="left" :class="{ disable: currentImage == 0 }" viewBox="0 0 24 24" @click="Prev()">
				<path d="M8.17,2,5.83,4.35,13.46,12,5.83,19.65,8.17,22l10-10Z" />
			</svg>

			<!-- <img :src="data[currentImage].gallery_image.url" :alt="data[currentImage].gallery_image.alt" /> -->
			<ImageItem width="90%" height="90%" :src="data[currentImage].gallery_image.url" :alt="data[currentImage].gallery_image.alt" />

			<svg class="right" :class="{ disable: currentImage == data.length - 1 }" viewBox="0 0 24 24" @click="Next()">
				<path d="M8.17,2,5.83,4.35,13.46,12,5.83,19.65,8.17,22l10-10Z" />
			</svg>
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
		async Next() {
			if (this.currentImage !== this.data.length - 1) this.currentImage++
			await this.$nextTick() // wait DOM to render
		},
		Prev() {
			if (this.currentImage !== 0) this.currentImage--
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

	.lightbox {
		svg {
			width: 30px;
			height: 30px;
			z-index: 100;
		}
	}
}
</style>
