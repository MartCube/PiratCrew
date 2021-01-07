<template>
	<div>
		<div class="container">
			<Intro />

			<About />
			<Shows />
			<Contact />
		</div>
	</div>
</template>

<script>
export default {
	middleware: 'navigation',
	data: () => ({}),
}
</script>

<style lang="scss" scoped>
@media (max-width: 600px) {
}
</style>
