<template>
	<section id="events" class="events-wrapper">
		<TextBox :text="t('pages.events')" />
		<div class="events-block">
			<div v-if="!pending" class="event-block__cards">
				<EventCard v-for="(event, i) in events" :key="i" :event="event" :reverse="i % 2 == 0 ? true : false" />
			</div>
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
	} else {
		return allEvents.value
			.sort((a, b) => new Date(b.first_publication_date) - new Date(a.first_publication_date))
	}

	return allEvents.value
})
</script>

<style lang="scss" scoped>
.events-wrapper {

	.events-block {
		width: 100%;
		overflow: hidden;
	}

	.event-block__cards {
		display: flex;
		align-items: center;
		padding: 20px;
		gap: 30px;

		overflow-x: auto;
		overflow-y: hidden;
		-webkit-overflow-scrolling: touch;

		scrollbar-width: none;
		-ms-overflow-style: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}

	@media (min-width: 1024px) {
		margin-bottom: 4rem;

		.event-block__cards {
			overflow-x: visible;
			scroll-snap-type: none;
			justify-content: center;
			// padding: 0;
			gap: 60px;

			display: grid;
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1280px) {
		.event-block__cards {
			gap: 80px;
		}
	}

}

</style>
