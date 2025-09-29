<template>
	<section id="events">
		<TextBox :text="t('pages.events')" />
	</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNuxtApp } from '#app'

const { t } = useI18n()
const events = ref([])

const nuxtApp = useNuxtApp()

onMounted(async () => {
	const response = await nuxtApp.$prismic.api.query(
		nuxtApp.$prismic.predicates.at('document.type', 'project'),
		{ orderings: '[document.first_publication_date desc]' }
	)
	events.value = response.results
})
</script>

<style lang="scss" scoped>
.events {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}

@media (max-width: 600px) {
	.events {
		margin-top: 2rem;
	}
}
</style>
