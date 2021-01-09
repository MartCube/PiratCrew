<template>
	<section id="about">
		<TextBox :text="$t('pages.about')" />
		<div class="about">
			<div class="text">
				<div class="wrap">
					<p>Show production <b>PIRAT CREW</b> 10 лет создает завораживающие шоу мирового масштаба. Держит курс на новые и неизведанные пути на карте современного театрального и хореографического искусства. В его команду входят артисты циркового жанра, танцоры, художники по костюмам, хореографы, режиссеры-постановщики шоу и мероприятий.</p>
					<p>Pirate Crew – команда уникальных, креативных и свободных. Об этом – наша история. Артистическое путешествие PIRAT CREW началось в 2010 году.</p>
					<p>С тех пор мы побывали в 20 странах с авторскими шоу, которые дарили восторг и радость зрителям во Франции, Швеции, Финляндии, Германии, Турции, Украине, России.</p>
				</div>
				<div class="wrap">
					<p>Более 3000 спектаклей, 1000 разработанных и поставленных мероприятий, 5 полномасштабных шоу.</p>
					<p>Jazz Do It Show, Bon Voyage, Juzeppe Hotel высоко оценили во всем мире. Шоу создаются под руководством директора и хореографа PIRAT CREW Дмитрия Юдина и команды междисциплинарных артистов.</p>
					<p>Цирковое искусство переплетается с музыкой и экспериментальной хореографией, авторские костюмы с современными технологиями, акробатика с экспрессивным замыслом. Все это вовлекает зрителя в волшебную и удивительную историю, которую мы рассказываем на новом визуальном языке.</p>
					<p>Добро пожаловать!</p>
				</div>
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
	align-items: flex-start;

	.text {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		.wrap {
			width: 45%;
			p {
				margin: 1.8rem 0;
				font-size: 1.2rem;
				line-height: 1.8rem;
				&:first-child {
					margin-top: 0;
				}
				&:last-child {
					margin-bottom: 0;
				}
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
