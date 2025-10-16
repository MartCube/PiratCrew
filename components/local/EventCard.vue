<template>
	<NuxtLink :to="link" class="event_card" >
		<div class="image">
			<ImageItem :src="event.data.main_image.url" :alt="title" :width="'500'" :height="'350'" />
			<div class="box"></div>
		</div>
		<div class="text">
			<h2>{{ title }}</h2>
		</div>
	</NuxtLink>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	event: {
		type: Object,
		required: true,
	},
	reverse: {
		type: Boolean,
		default: false,
	},
})

const { $prismic, $linkResolver } = useNuxtApp()

const title = computed(() => props.event.data.title)
const link = computed(() => {
	if ($linkResolver && typeof $linkResolver === 'function') {
		const resolvedLink = $linkResolver(props.event)
		return resolvedLink
	} else {
		const docType = props.event.type
		const fallbackLink = `/${docType}s/${props.event.uid}`
		return fallbackLink
	}
})
</script>

<style lang="scss" scoped>
.event_card {
	flex-direction: column;
	color: white;
	text-decoration: none;
	position: relative;
	width: 100%;
	flex : 0 0 auto;
	.text {
		text-align: right;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.1) 20%,
			rgba(0, 0, 0, 0.3) 40%,
			rgba(0, 0, 0, 0.5) 60%,
			rgba(0, 0, 0, 0.7) 80%,
			rgba(0, 0, 0, 0.9) 100%
		);

		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 2rem 1rem;

		p {
			line-height: 1.2;
			display: none;
		}

		h2 {
			position: relative;
			font-size: 2rem;
			line-height: 2rem;
			margin: 0;
			z-index: 2;

			&::before {
				content: '';
				display: flex;
				height: 100%;
				position: absolute;
				right: -1rem;
				bottom: 0;
				width: 2px;
				background-color: white;
			}
		}
	}
	.image {
		position: relative;
		max-width: 500px;
		width: 100%;
		height: 350px;
		.box {
				z-index: -1;
				position: absolute;
				bottom: 20px;
				right: 20px;

				width: 100%;
				height: 100%;
				border: 2px solid white;
				transition: all .5s ease;
			}
	}
}

@media (min-width: 1024px) {
	.event_card {
		margin-bottom: 0;

		.text {
			background: rgba(0, 0, 0, 0.5);

			transition: all 0.5s ease;
			overflow: hidden;
			opacity: 0;
			h2 {
				transform: translateX(200%);
				opacity: 0;
				transition: all 0.8s ease;
			}
		}

		&:hover {
			.text {
				opacity: 1;

				h2 {
					transform: translateX(0);
					opacity: 1;
				}
			}
		}
	}
}

@media (min-width: 1280px) {
	.event_card {
		.image {
			.box {
				z-index: -1;
				position: absolute;
				bottom: 20px;
				right: 20px;

				width: 100%;
				height: 100%;
				border: 2px solid white;
				transition: all .5s ease;
			}
		}
		&:hover {
			.image {
				.box {
					transform: translate(20px, 20px);
					opacity: 0;
				}
			}
		}
	}
}
</style>
