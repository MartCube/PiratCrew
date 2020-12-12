<template>
	<section id="contact">
		<TextBox :text="$t('pages.contact')" />
		<div class="contact">
			<div class="info">
				<div class="adress">
					<h2>adress <i class="icon icon-location" /></h2>
					<p>Ukraine, Kyiv. Kreschatik 322</p>
				</div>
				<div class="phone">
					<h2>phone <i class="icon icon-phone" /></h2>
					<p>Viber <a href="tel:+380492322105">+380 492 322 105</a></p>
					<p>WhatsApp <a href="tel:+380492322105">+380 492 322 105</a></p>
				</div>
				<div class="smedias">
					<h2>Follow us</h2>

					<a href="https://www.facebook.com/" target="blank"> <i class="icon icon-facebook" /></a>
					<a href="https://www.instagram.com/" target="blank"> <i class="icon icon-instagram" /></a>
					<a href="https://www.youtube.com/" target="blank"><i class="icon icon-youtube" /></a>
				</div>
			</div>
			<ValidationObserver ref="form_mail" tag="form" class="form" @submit.prevent="Submit()">
				<h2>write us</h2>
				<InputItem :name="'email'" :rules="'email|required'" @getValue="getEmail" />
				<InputItem :name="'subject'" :rules="'required'" @getValue="getSubject" />
				<InputItem :name="'message'" :rules="'required'" @getValue="getMessage" />

				<button v-if="!loading" type="submit" class="submit">
					<span>submit<i class="icon icon-mail" /></span>
				</button>
				<div v-else class="submit"><Spinner /></div>
			</ValidationObserver>
		</div>
	</section>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

export default {
	components: {
		ValidationObserver,
	},
	data: () => ({
		form: {
			email: String,
			subject: String,
			message: String,
		},
		loading: false,
	}),
	computed: {},
	methods: {
		getEmail(value) {
			this.form.email = value
		},
		getSubject(value) {
			this.form.subject = value
		},
		getMessage(value) {
			this.form.message = value
		},
		async Submit() {
			const isValid = await this.$refs.form_mail.validate()
			if (!isValid) return

			this.$nextTick(() => {
				this.$refs.form_mail.reset()
			})

			console.log('submit')
			// trigger netlify function
			this.loading = true

			try {
				await this.$axios.$post('.netlify/functions/sendmail', this.form).then(() => {
					this.loading = false
				})
			} catch (error) {
				console.log(error)
			}
			console.log('submit')
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';

.contact {
	width: 100%;
	border-left: 2px solid #fff;

	display: flex;
	justify-content: space-evenly;
	align-items: center;
	align-content: center;
	h2 {
		text-transform: uppercase;
		margin: 0 0 15px 0;
	}
	.info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-basis: 40%;
		height: 350px;

		p {
			margin: 5px 0;
			user-select: text;
			line-height: 1.1;
			a {
				margin-left: 5px;
			}
		}
		a {
			font-size: 1em;
			color: #fff;
		}
		.smedias {
			display: flex;
			flex-wrap: wrap;
			// flex-direction: column;
			h2 {
				width: 100%;
			}
			a {
				text-decoration: none;
				font-size: 1em;
				color: white;
			}
			.icon {
				margin-right: 10px;
				font-size: 1.5em;
				color: inherit;
			}
			&:hover {
				&.icon-facebook {
					color: $facebook;
				}
				&.icon-instagram {
					color: $instagram;
				}
				&.icon-youtube {
					color: $youtube;
				}
			}
		}
		.phone {
			p {
				justify-content: space-between;
				display: flex;
			}
		}
		.icon-facebook {
			color: $facebook;
		}
		.icon-instagram {
			color: $instagram;
		}
		.icon-youtube {
			color: $youtube;
		}
	}
	.form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-basis: 40%;
		height: 350px;

		.submit {
			width: 100%;
			height: 50px;
			margin-top: 10px;
			padding: 10px 0;

			color: white;
			border: 1px solid white;
			background: transparent;
			cursor: pointer;
			outline: none;

			font-family: 'codec_bold';
			letter-spacing: 2px;
			font-size: 1em;
			text-transform: uppercase;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
		}
	}
}

@media (max-width: 800px) {
	#contact {
		padding: 40px;
	}
	.contact {
		flex-direction: column-reverse;
		padding: 0 1rem;
		border: none;
		.info {
			flex-basis: initial;
			width: 100%;
			margin-top: 4rem;

			height: auto;
			.smedias,
			.phone,
			.adress {
				margin-bottom: 3rem;
			}
		}
		.form {
			width: 100%;
			.form_group {
				margin: 10px 0;
			}
			.submit {
				margin-top: 2rem;
			}
		}
	}
}
</style>
