<template>
	<div class="container">
		<div v-if="$fetchState.error" class="error">
			<p>{{ $fetchState.error }}</p>
		</div>
		<div v-if="$fetchState.pending" class="loading">
			<p>loading..</p>
		</div>
		<div v-if="!$fetchState.error && !$fetchState.pending" class="event">
			<!-- <ImageItem :image-src="event.main_image" :image-alt="event.title" /> -->
			<Intro />
			<div class="title">
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

		console.log(event)
	},
	data: () => ({
		event: Object,
	}),
	mounted(){
		document.querySelector("body").classList.add("white")
		document.querySelector("body").classList.add("event")
	},
	destroyed(){
		document.querySelector("body").classList.remove("white")
		document.querySelector("body").classList.remove("event")
	},
}
</script>

<style lang="scss" scoped>
.event {
	width: 100%;
	min-height: 100vh;
	margin: 40px 0 0;
	background-color: #fff;
	color:#000;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	.title {
		display: flex;
    width: -webkit-fill-available;
    padding: 3rem 14vw 1rem;
    margin: 0;
    position: relative;
		&::before {
			content: '';
			display: flex;
			position: absolute;
			background-color: #000;
			z-index: 1;
			left: 0;
			width: 14vw;
			top: 47%;
			height: 2rem;
		}
	}
	h2 {
		margin: 0;
    font-size: 2.75em;
    background-color: #fff;
    padding: 0 8.3vw;
    position: relative;
    z-index: 3;
	}
	.text {
		margin: 30px auto;
    width: 55vw;
    display: flex;
	}
}
@media (max-width: 600px) {
	.event{
		.title{
			padding: 3rem 6vw 1rem;
		}
		h2{
			padding: 0 3.3vw;
		}
		.text {
			width: 80vw;
		}
	}
	
}
</style>
