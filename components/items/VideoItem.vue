<template>
	<client-only>
		<LazyYoutube :src="video" :autoplay="true" />
	</client-only>
</template>

<script setup>
import { LazyYoutube } from 'vue-lazytube'

defineProps({
	video: {
		type: String,
		required: true,
	},
})
</script>

<style lang="scss">
.ipOhDr {
	max-width: initial;
	padding: 5vw;
	width: 95vw;
	height: 95vh;
}
</style>
