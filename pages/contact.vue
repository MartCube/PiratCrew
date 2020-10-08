<template>
	<Contact />
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
