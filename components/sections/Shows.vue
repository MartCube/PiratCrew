<template>
	<section id="shows">
		<TextBox :text="t('pages.shows.name')" />
		<div v-if="!pending" class="shows">
			<ShowCard v-for="(event, i) in events" :key="i" :event="event" :reverse="i % 2 == 0 ? true : false" />
		</div>
		<div v-if="error" class="error">
			<h2>Something went wrong, please try again later.</h2>
		</div>
	</section>
</template>

<script setup>
const { $prismic } = useNuxtApp()
const { t } = useI18n()

const { data: events, pending, error } = await useLazyAsyncData('shows', async () => {
	try {
		// Використовуємо новий client API замість старого api.query
		const documents = await $prismic.client.getAllByType('show')
		return documents || []
	} catch (err) {
		console.error('Error fetching shows:', err)
		throw err
	}
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
