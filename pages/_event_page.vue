<template>
	<div class="container">
		<div v-if="$fetchState.error" class="error">
			<p>{{ $fetchState.error }}</p>
		</div>
		<div v-if="$fetchState.pending" class="loading">
			<p>loading..</p>
		</div>
		<div v-if="!$fetchState.error && !$fetchState.pending" class="event">
			<Intro />

			<div class="title">
				<n-link class="back" to="/"><i class="icon icon-back" /> </n-link>
				<h2>{{ event.title }}</h2>
			</div>
			<div class="text">
				{{ event.text }}
			</div>
			<Gallery :data="event.gallery" />

			<Contact />
		</div>
	</div>
</template>

<script>
export default {
	async fetch() {
		const event = await this.$prismic.api.getByUID('project', this.$route.params.event_page)
		this.event = {
			main_image: event.data.main_image.url,
			title: this.$prismic.asText(event.data.title),
			text: this.$prismic.asText(event.data.text),
			gallery: event.data.gallery,
		}
	},
	data: () => ({
		event: Object,
	}),
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.$store.commit('setTheme', 'white')
		})
	},
}
</script>

<style lang="scss" scoped>
.event {
	width: 100%;
	min-height: 100vh;
	margin: 40px 0 0;
	background-color: #fff;
	color: #000;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.title {
		width: 100%;
		padding: 3rem 40px;
		margin: 0;

		display: flex;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		.back {
			padding: 1rem;
			margin-right: 3rem;

			background: black;
			color: white;
			font-size: 1.5rem;
			text-decoration: none;
			text-align: right;
		}
		h2 {
			font-size: 3em;
			background-color: #fff;
			position: relative;
			z-index: 3;
		}
	}

	.text {
		margin-bottom: 3rem;
		width: 55vw;
		display: flex;
	}
}
@media (max-width: 600px) {
	.event {
		.title {
			.back {
				margin-right: 1rem;
				font-size: 0.8rem;
			}
			h2 {
				font-size: 2rem;
			}
		}

		.text {
			padding: 0 40px;
			width: 100%;
		}
	}
}
</style>
