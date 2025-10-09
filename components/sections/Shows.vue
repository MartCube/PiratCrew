<template>
	<section id="shows">
		<TextBox :text="t('pages.shows.name')" />
		<div v-if="!pending" class="shows">
			<ShowCard v-for="(show, i) in shows" :key="i" :event="show" :reverse="i % 2 == 0 ? true : false" />
		</div>
		<div v-if="error" class="error">
			<h2>Something went wrong, please try again later.</h2>
		</div>
	</section>
</template>

<script setup>
const { $prismic } = useNuxtApp()
const { t } = useI18n()
const route = useRoute()

const isHomePage = computed(() => route.path === '/')

const { data: allShows, pending, error } = await useLazyAsyncData('shows-list', async () => {
	try {
		const documents = await $prismic.client.getAllByType('show')
		return documents || []
	} catch (err) {
		console.error('Error fetching shows:', err)
		throw err
	}
})


const shows = computed(() => {

	if (!allShows.value) return []

	if (isHomePage.value) {
		return allShows.value
			.sort((a, b) => new Date(b.first_publication_date) - new Date(a.first_publication_date))
			.slice(0, 3)
	}

	return allShows.value
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
