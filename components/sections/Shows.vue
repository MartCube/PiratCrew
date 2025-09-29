<template>
	<section id="shows">
		<TextBox :text="t('pages.shows.name')" />
		<div v-if="!pending" class="shows">
			<ShowCard v-for="(event, i) in events" :key="i" :event="event" :reverse="i % 2 == 0 ? true : false" />
		</div>
		<div v-if="error" class="error">
			<h2>Упс что-то пошло не так, перезагрузите страницу пожалуйста</h2>
		</div>
	</section>
</template>

<script setup>
const { $prismic } = useNuxtApp()
const { t } = useI18n()

const { data: events, pending, error } = await useLazyAsyncData('shows', async () => {
	const response = await $prismic.api.query($prismic.predicates.at('document.type', 'show'))
	return response.results
})
</script>

<style lang="scss" scoped>
.shows {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}
</style>
