<template>
	<section id="events" class="events-wrapper">
		<TextBox :text="t('pages.events')" />
		<div v-if="!pending" class="events">
			<EventCard v-for="(event, i) in events" :key="i" :event="event" :reverse="i % 2 == 0 ? true : false" />
		</div>
		<div v-if="error" class="error">
			<h2>Something went wrong, please try again later.</h2>
		</div>
		</section>
</template>

<script setup>

const { t } = useI18n()
const { $prismic } = useNuxtApp()
const route = useRoute()

const isHomePage = computed(() => route.path === '/')


const { data: allEvents, pending, error } = await useLazyAsyncData('events-list', async () => {
	try {
		const documents = await $prismic.client.getAllByType('event')
		return documents || []
	} catch (err) {
		console.error('Error fetching events:', err)
		throw err
	}
})

const events = computed(() => {

	if (!allEvents.value) return []

	if (isHomePage.value) {
		return allEvents.value
			.sort((a, b) => new Date(b.first_publication_date) - new Date(a.first_publication_date))
			.slice(0, 3)
	}

	return allEvents.value
})
</script>

<style lang="scss" scoped>
.events-wrapper {

	.events {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	@media (min-width: 1024px) {
		margin-bottom: 4rem;

		.events {
			flex-direction: row;
			gap: 20px;
		}

	}
	@media (min-width: 1280px) {
		.events {
			gap: 40px;
		}
	}
}

</style>
