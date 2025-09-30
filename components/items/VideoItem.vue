<template>
	<ClientOnly>
		<div class="youtube-wrapper">
			<iframe
				:src="youtubeUrl"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				class="youtube-iframe"
				title="YouTube video player"
			></iframe>
		</div>
		<template #fallback>
			<div class="loading">Завантаження відео...</div>
		</template>
	</ClientOnly>
</template><script setup>
import { computed } from 'vue'

const props = defineProps({
	video: {
		type: String,
		required: true,
	},
})

// Створюємо URL для YouTube iframe з оптимальними параметрами
const youtubeUrl = computed(() => {
	const params = new URLSearchParams({
		autoplay: '1',
		controls: '1',
		rel: '0',
		modestbranding: '1',
		fs: '1',
		cc_load_policy: '0',
		iv_load_policy: '3',
		enablejsapi: '1',
		playsinline: '1'
	})

	return `https://www.youtube.com/embed/${props.video}?${params.toString()}`
})
</script>

<style lang="scss" scoped>
.youtube-wrapper {
	max-width: initial;
	padding: 5vw;
	width: 95vw;
	height: 95vh;
	position: relative;

	.youtube-iframe {
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 8px;
	}
}

.loading {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 400px;
	color: white;
	font-size: 1.2rem;
}

@media (max-width: 768px) {
	.youtube-wrapper {
		padding: 2vw;
		width: 96vw;
		height: 50vh;
	}
}
</style>