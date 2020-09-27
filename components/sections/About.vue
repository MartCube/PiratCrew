<template>
	<section id="about">
		<TextBox text="about" />
		<div class="about">
			<ImageItem image-src="/photo.jpg" image-alt="about" />
			<div class="text">
				<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, facere?</p>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat ex numquam iusto?</p>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia nostrum laudantium, labore earum ut expedita possimus?</p>
				<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data: () => ({}),
}
</script>

<style lang="scss" scoped>
.about {
	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
	align-content: center;
	.image {
		flex-basis: 55%;
		max-width: 100%;
	}
	.text {
		flex-basis: 30%;
		p {
			margin-bottom: 20px;
		}
	}
}

@media (max-width: 600px) {
}
</style>
