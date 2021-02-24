<template>
	<section id="about">
		<TextBox :text="$t('pages.about')" />
		<div class="about">
			<div class="text">
				<div class="wrap">
					<p>Show production <b>PIRAT CREW</b> 10 лет создает завораживающие шоу мирового масштаба. Держит курс на новые и неизведанные пути на карте современного театрального и хореографического искусства. В его команду входят артисты циркового жанра, танцоры, художники по костюмам, хореографы, режиссеры-постановщики шоу и мероприятий.</p>
					<a class="more" href="#">
						<span>More</span>
						<hr />
					</a>
				</div>
				<div class="box" @mouseover="cursorMove()">
					<div class="box-wrapper">
						<!-- <img src="../../static/lettersTransparent.png"  alt=""> -->
						<div class="image"></div>
					</div>
					<div class="border"></div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data: () => ({}),
	beforeDestroy() {
		// window.removeEventListener('mousemove', this.resizeHandler);
	},
	methods: {
		cursorMove() {
			const bg = document.querySelector('.about .box .image')
			const border = document.querySelector('.about .box .border')
			const breakpoint = window.matchMedia('(max-width:800px)')
			if (!breakpoint.matches) {
				document.querySelector('.box .image').addEventListener('mousemove', (e) => {
					const x = -(e.pageX + bg.offsetLeft) / 20
					const y = -(e.pageY + bg.offsetTop) / 20
					const borderx = Math.abs(-(e.pageX + bg.offsetLeft) / 40)
					const bordery = -(e.pageY + bg.offsetTop) / 40

					border.style.transform = `translate(${borderx}px, ${bordery}px)`
					bg.style.backgroundPosition = `${x}px ${y}px`
				})
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.box {
	width: 50vw;
	position: relative;
	height: 30rem;
	margin-right: 4%;
	.border {
		height: 100%;
		width: 100%;
		position: absolute;
		top: -10px;
		right: -40px;
		border: 3px solid white;
		z-index: 0;
	}
}

.box-wrapper {
	overflow: hidden;
	position: relative;
	width: inherit;
	height: inherit;
	img {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 3;
	}
	.image {
		width: 120%;
		background-image: url('../../static/photo.jpg');
		background-size: cover;
		background-position: center;
		height: 120%;
		background-repeat: no-repeat;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
}
.about {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	position: relative;
	margin-bottom: 4rem;
	.piratcrew {
		width: 100%;
		position: relative;

		img {
			width: inherit;
		}
		.letters {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 2;
		}
	}
	.text {
		display: flex;
		justify-content: flex-end;
		width: 100%;
		align-items: flex-start;
		.wrap {
			width: 30rem;
			z-index: 5;
			position: absolute;
			background-color: #000;
			padding: 3rem 3rem 3rem 1.5rem;
			bottom: -17%;
			left: 0%;
			p {
				// margin: 1.8rem 0;
				font-size: 1.2rem;
				line-height: 1.8rem;
			}
			.more {
				font-weight: 600;
				margin-top: 2rem;
				text-transform: uppercase;
				font-size: 1.3em;
				text-decoration: none;
				color: white;
				display: flex;
				align-items: center;
				justify-content: space-between;
				transition: all 0.2s linear;
				hr {
					width: 50%;
					transition: all 0.2s linear;
				}
			}
			&:hover {
				cursor: pointer;
				.more {
					color: rgb(156, 154, 154);
					hr {
						width: 70%;
					}
				}
			}
		}
	}
}
@media (max-width: 1200px) {
	.about .text .wrap {
		bottom: -10vw;
	}
}
@media (max-width: 800px) {
	.box {
		width: 100%;
		.border {
			display: none;
		}
	}
	.about {
		margin-bottom: 0;
		.text {
			flex-direction: column;
			.wrap {
				position: relative;
				bottom: 0;
				width: 100%;
				p {
					font-size: 1rem;
				}
			}
		}
	}
}
@media (max-width: 600px) {
}
</style>
