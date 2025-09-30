<template>
	<div class="container">
		<template v-if="error">
			<Error />
		</template>
		<template v-else-if="pending">
			<!-- loading animation -->
			loading
		</template>
		<template v-else>
			<Intro :video="pageData.uid" @clickVideo="openModal" />

			<Modal :video="pageData.video" />

			<section id="show">
				<h2 class="title">{{ pageData.title }}</h2>
				<div class="description rich_text">
					<prismic-rich-text :field="pageData.description" />
				</div>
			</section>

			<Gallery :data="pageData.gallery" />

			<Contact />
		</template>
	</div>
</template>

<script setup>
definePageMeta({
	middleware: 'navigation'
})

const route = useRoute()
const { $prismic } = useNuxtApp()
const modal = useModal()
const { locale, locales } = useI18n()



// Data fetching з Nuxt 3 composable
const { data: eventData, pending, error, refresh } = await useLazyAsyncData('show', async () => {
	try {
    const prismicCode = locale.value === 'ua' ? 'uk-ua' : 'en-us';
		const event = await $prismic.client.getByUID('show', route.params.show_uid, { lang: prismicCode });

		return {
			bg: event.data.main_image?.alt || 'piratcrew',
			title: event.data.title,
			video: event.data.video,
			description: event.data.description,
			gallery: event.data.gallery,
			uid: event.uid,
		}
	} catch (err) {
		console.error('Error fetching show:', err)
		throw err
	}
})

// Page data
const pageData = computed(() => eventData.value || {});

console.log('pageData', pageData.value);

watch(locale, () => {
	refresh();
})

// Methods
const openModal = () => {
	modal.value = true
}
</script>

<style lang="scss" scoped>
#show {
	width: 100%;

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	.title {
		width: 100%;
		height: 2rem;
		margin: 3rem 0;
		padding-left: 1rem;

		text-transform: uppercase;
		font-size: 2rem;
		position: relative;

		display: flex;
		align-items: center;

		&::before {
			content: '';
			height: 100%;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 2px;
			background: white;
		}
	}
	.description {
		display: flex;
		flex-direction: column;
		width: 60%;
	}
}

@media (max-width: 700px) {
	#show {
		.title h2 {
			font-size: 2rem;
		}
		.description {
			width: 100%;
		}
	}
}
</style>
