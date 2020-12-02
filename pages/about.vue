<template>
	<section id="about">
		<TextBox text="О нас" white />
		<div class="about">
			<ImageItem image-src="/photo.jpg" image-alt="about" />
			<p>Show production <b>PIRAT CREW</b> 10 лет создает завораживающие шоу мирового масштаба. Держит курс на новые и неизведанные пути на карте современного театрального и хореографического искусства. В его команду входят артисты циркового жанра, танцоры, художники по костюмам, хореографы, режиссеры-постановщики шоу и мероприятий. Pirate Crew – команда уникальных, креативных и свободных. Об этом – наша история.</p>
			<p>Артистическое путешествие PIRAT CREW началось в 2010 году.</p>
			<p>С тех пор мы побывали в 20 странах с авторскими шоу, которые дарили восторг и радость зрителям во Франции, Швеции, Финляндии, Германии, Турции, Украине, России.</p>
			<p>Более 3000 спектаклей, 1000 разработанных и поставленных мероприятий, 5 полномасштабных шоу.</p>
			<p>Jazz Do It Show, Bon Voyage, Juzeppe Hotel высоко оценили во всем мире. Шоу создаются под руководством директора и хореографа PIRAT CREW Дмитрия Юдина и команды междисциплинарных артистов. Цирковое искусство переплетается с музыкой и экспериментальной хореографией, авторские костюмы с современными технологиями, акробатика с экспрессивным замыслом. Все это вовлекает зрителя в волшебную и удивительную историю, которую мы рассказываем на новом визуальном языке. Добро пожаловать!</p>
		</div>
	</section>
</template>

<script>
export default {
	middleware: 'navigation',
	data: () => ({}),
}
</script>

<style lang="scss" scoped>
#about {
	background-color: #fff;
	color: #000;
}
.about {
	width: 100%;
	.image {
		width: 40vw;
		float: left;
		height: auto;
		margin: 0 3rem 2.5rem 0;
	}
	p {
		margin-bottom: 20px;
		line-height: 1.2;
	}
}

@media (max-width: 850px) {
	.about {
		display: flex;
		flex-direction: column;
		padding-bottom: 3vw;
		p {
			margin-bottom: 1rem;
			line-height: 1.3;
			font-size: 15px;
			letter-spacing: 0px;
		}
		.image {
			max-width: 100%;
			width: 100%;
			margin: 1rem 0 4rem;
			order: 2;
		}
	}
}
@media (max-width: 600px) {
	.about {
		padding: 1.5rem 1.5rem 4rem 1.5rem;
		.image {
			margin: 0.5rem 0 0 0;
		}
	}
	#about {
		.text_box {
			margin: 5rem 0 1rem;
		}
	}
}
</style>
