<template>
	<div>
		<div class="container">
			<Intro video="piratcrew" />
			<AboutHome />
			<Shows />
			<Contact />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	middleware: 'navigation',
	data: () => ({}),
}
</script>

<style lang="scss" scoped>
@media (max-width: 600px) {
}
</style>
