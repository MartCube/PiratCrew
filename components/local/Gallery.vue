<template>
	<div id="gallery" class="gallery">
		<!-- Custom lightbox modal -->
		<div v-if="showLightbox" class="lightbox-overlay" @click="closeLightbox">
			<div class="lightbox-content" @click.stop>
				<button class="lightbox-close" @click="closeLightbox">&times;</button>
				<button v-if="index > 0" class="lightbox-prev" @click="prevImage">‹</button>
				<img :src="currentImage" :alt="`Gallery image ${index + 1}`" class="lightbox-image">
				<button v-if="index < data.length - 1" class="lightbox-next" @click="nextImage">›</button>
			</div>
		</div>

		<div class="wrapper">
			<div v-for="(item, i) in data" :key="i" class="image" @click="openLightbox(i)">
				<ImageItem :src="item.gallery_image.url" :alt="item.gallery_image.alt" />
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: {
		type: Array,
		required: true,
	},
})

const index = ref(null)
const showLightbox = ref(false)

const currentImage = computed(() => {
	if (index.value !== null && props.data[index.value]) {
		return props.data[index.value].gallery_image.url
	}
	return ''
})

const openLightbox = (i) => {
	index.value = i
	showLightbox.value = true
	document.body.style.overflow = 'hidden' // Disable scrolling
}

const closeLightbox = () => {
	showLightbox.value = false
	index.value = null
	document.body.style.overflow = '' // Re-enable scrolling
}

const nextImage = () => {
	if (index.value < props.data.length - 1) {
		index.value++
	}
}

const prevImage = () => {
	if (index.value > 0) {
		index.value--
	}
}

// Handle keyboard navigation
onMounted(() => {
	const handleKeydown = (e) => {
		if (!showLightbox.value) return

		switch (e.key) {
			case 'Escape':
				closeLightbox()
				break
			case 'ArrowLeft':
				prevImage()
				break
			case 'ArrowRight':
				nextImage()
				break
		}
	}

	document.addEventListener('keydown', handleKeydown)

	onUnmounted(() => {
		document.removeEventListener('keydown', handleKeydown)
		document.body.style.overflow = '' // Cleanup
	})
})
</script><style lang="scss" scoped>

$grid-gutter-width: 20px;
$row-height: 300px;
$column-count: 4;

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

/* Custom Lightbox Styles */
.lightbox-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.9);
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
}

.lightbox-content {
	position: relative;
	max-width: 90%;
	max-height: 90%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.lightbox-image {
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
}

.lightbox-close {
	position: absolute;
	top: -40px;
	right: -40px;
	background: none;
	border: none;
	color: white;
	font-size: 30px;
	cursor: pointer;
	z-index: 10000;
	padding: 5px;

	&:hover {
		opacity: 0.7;
	}
}

.lightbox-prev,
.lightbox-next {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background: rgba(255, 255, 255, 0.2);
	border: none;
	color: white;
	font-size: 24px;
	cursor: pointer;
	padding: 10px 15px;
	z-index: 10000;

	&:hover {
		background: rgba(255, 255, 255, 0.3);
	}
}

.lightbox-prev {
	left: -60px;
}

.lightbox-next {
	right: -60px;
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

	.lightbox-close {
		top: 10px;
		right: 10px;
	}

	.lightbox-prev,
	.lightbox-next {
		font-size: 20px;
		padding: 8px 12px;
	}

	.lightbox-prev {
		left: 10px;
	}

	.lightbox-next {
		right: 10px;
	}
}
</style>
