<template>
	<section id="crew">
		<TextBox :text="t('pages.crew')" />

		<div class="grid">
			<Artist v-for="artist in crew" :key="artist.primary.image.alt" :image="artist.primary.image.url" :name="artist.primary.image.alt" />
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const crew = ref([])

onMounted(async () => {
	const response = await $prismic.api.getSingle('artists')
	crew.value = response.data.body
})
</script>

<style lang="scss" scoped>
.grid {
	display: flex;
	flex-wrap: wrap;

	align-items: center;
	justify-content: center;
}

@media (max-width: 940px) {
	.grid {
		justify-content: space-evenly;
		.artist:last-child {
			margin: 0;
		}
	}
}
</style>
