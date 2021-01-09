<template>
	<section id="about">
		<TextBox :text="$t('pages.about')" />
		<div class="about">
				<div class="wrap">
						<ImageItem image-src="./photo.jpg" image-alt="main_image" box />
				</div>
				<div class="wrap text">
					<p>Show production <b>PIRAT CREW</b> 10 лет создает завораживающие шоу мирового масштаба. Держит курс на новые и неизведанные пути на карте современного театрального и хореографического искусства. В его команду входят артисты циркового жанра, танцоры, художники по костюмам, хореографы, режиссеры-постановщики шоу и мероприятий.</p>
					<n-link :to="localePath('about')" class="link"> {{ $t('extra.more') }}</n-link>
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
	align-items: stretch;

	.wrap {
		width: 45%;
		align-items: start;
		justify-content: space-between;
		display: inherit;
		flex-direction: column;
		transition: .3s linear;
		p {
			margin: 1.8rem 0;
			font-size: 1.1rem;
			line-height: 1.8rem;
			&:first-child {
				margin-top: 0;
			}
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
	.link{
		text-transform: uppercase;
		color:rgb(199, 199, 199);
		font-weight: bold;
		padding-left: 10px;
		border-left: 2px solid #f2f2f2;
		font-size: 1.3rem;
		height: 1.5rem;
		display: inline-flex;
		align-items: center;
		transition: .3s linear;
	
	}
	&:hover{
		.link{
			transform: translateX(10px);
		}
		.wrap .image{
			.box{
				bottom: -20px;
				top: initial;
				left: -20px;
				right: initial;
			}
		}
	}
}

@media (max-width: 800px) {
	.about .text {
		flex-direction: column;
		.wrap {
			width: 100%;
			p {
				font-size: 1rem;
			}
		}
	}
}
@media (max-width: 600px) {
}
</style>
