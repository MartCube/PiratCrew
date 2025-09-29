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

<script setup>
defineOptions({
	name: 'Home',
	middleware: 'navigation'
})
</script>

<style lang="scss" scoped>
@media (max-width: 600px) {
}
</style>
