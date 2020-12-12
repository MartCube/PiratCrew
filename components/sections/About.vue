<template>
	<section id="about">
		<TextBox :text="$t('pages.about')" />
		<div class="about">
			<ImageItem image-src="/photo.jpg" image-alt="about" />
			<div class="text">
				<p>Show production <b>PIRAT CREW</b> 10 лет создает завораживающие шоу мирового масштаба. Держит курс на новые и неизведанные пути на карте современного театрального и хореографического искусства. В его команду входят артисты циркового жанра, танцоры, художники по костюмам, хореографы, режиссеры-постановщики шоу и мероприятий. Pirate Crew – команда уникальных, креативных и свободных. Об этом – наша история.</p>
				<n-link to="/about" class="link"> Читать </n-link>
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
		position: relative;
	}
	.link {
		margin: 10px 0;
		font-family: 'codec_bold';
		font-size: 1.2em;
		display: block;
		text-transform: uppercase;
		color: white;
		transition: 0.3s ease;
		text-decoration: none;
		&:hover {
			opacity: 0.5;
			transform: translateX(10px);
		}
	}
}

@media (max-width: 850px) {
	.about {
		flex-direction: column-reverse;
		padding-bottom: 3vw;
		.text {
			flex-basis: initial;
			max-width: 80%;
			margin-bottom: 3vw;
			p {
				margin-bottom: 1rem;
				line-height: 1.3;
				font-size: 15px;
				letter-spacing: 0px;
			}
		}
		.image {
			max-width: 80%;
			margin: 2rem 0 4rem;
		}
	}
}
@media (max-width: 600px) {
	.about {
		.text {
			width: 90%;
		}
		.image {
			margin: 4rem 0;
		}
	}
}
</style>
