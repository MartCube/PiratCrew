<template>
	<section id="intro">
		<div class="intro">
			<TextBox text="pirat" />
			<TextBox text="crew" />
		</div>
	</section>
</template>

<script>
export default {
	data: () => ({}),
}
</script>

<style lang="scss" scoped>
.intro {
	width: 100%;
	min-height: 100vh;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	.text_box {
		align-self: center;
		margin: 0;
		h2 {
			font-size: 14em;
		}
	}
}

@media (max-width: 600px) {
}
</style>
