<template>
	<div class="container">
		<Intro />
		<About />
		<Portfolio />
		<Contact />
	</div>
</template>

<script>
export default {
	data: () => ({}),
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.$store.commit('setTheme', 'black')
		})
	},
}
</script>

<style lang="scss" scoped>
@media (max-width: 600px) {
}
</style>
