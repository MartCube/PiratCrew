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
	middleware: 'navigation',
	data: () => ({}),
}
</script>

<style lang="scss" scoped>
@media (max-width: 600px) {
}
</style>
