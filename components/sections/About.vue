<template>
	<section id="about">
		<TextBox text="about" />
		<div class="about">
			<ImageItem image-src="/photo.jpg" image-alt="about" />
			<div class="text">
				<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, facere? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique excepturi vero repellendus quae, natus eos. Fuga enim consequuntur odit soluta quod eos debitis recusandae fugit dolorum ratione nesciunt ipsam temporibus facere voluptatum quis inventore rem cumque fugiat error libero, dolore delectus. Labore obcaecati cum corporis facilis tenetur vel explicabo autem voluptas mollitia odio, dolores hic repellat suscipit reprehenderit eos porro provident expedita dolore similique officiis voluptatem quia voluptatum alias! Quod ullam nesciunt quam, enim totam laboriosam mollitia doloribus ratione aliquam nemo consectetur est modi similique, explicabo possimus illum quasi eos. Soluta quisquam eius eaque veniam, reiciendis eveniet et nisi magni.</p>
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
		flex-basis: 30vw;
		p {
			margin-bottom: 20px;
			line-height: 1.1;
		}
	}
}

@media (max-width: 850px) {
	.about{
		flex-direction: column-reverse;
		padding-bottom: 3vw;
		.text{
			flex-basis: initial;
			max-width: 80%;
			margin-bottom: 3vw;
			p{
				margin-bottom: 0;
				line-height: 1.3;
				font-size: 15px;
				letter-spacing: 0px;
			}
		}
		.image{
			max-width: 80%;
		}
	}
}
@media (max-width: 600px) {
	.about{
		.text{width: 90%;}		
		.image{
			margin: 4rem 0;
		}
	} 

}
</style>
