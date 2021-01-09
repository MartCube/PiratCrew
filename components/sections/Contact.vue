<template>
	<section id="contact">
		<TextBox :text="$t('pages.contact')" />

		<transition name="page" appear mode="out-in">
			<ValidationObserver v-if="!complete" ref="form_contact" tag="form" @submit.prevent="Submit()">
				<div class="wrap">
					<div class="info media">
						<h2>follow</h2>
						<p><a href="#">facebook</a><a href="#">youtube</a><a href="#">instagram</a></p>
					</div>
					<div class="info phone">
						<h2>phone</h2>
						<p>Viber <a href="tel:+380492322105">+380 492 322 105</a></p>
						<p>WhatsApp <a href="tel:+380492322105">+380 492 322 105</a></p>
					</div>
					<div class="info mail">
						<h2>email</h2>
						<p><a href="tel:+380492322105">piratcrew@gmail.com</a></p>
					</div>
				</div>
				<div class="wrap">
					<div class="info title">
						<h2>write us</h2>
					</div>
					<InputItem :name="'email'" :rules="'email|required'" @getValue="getEmail" />
					<InputItem :name="'number'" :rules="'required'" @getValue="getSubject" />
					<InputItem :name="'message'" :rules="'required'" @getValue="getMessage" />

					<button type="submit" class="submit">
						<span v-if="!loading">submit<i class="icon icon-mail" /></span>
						<spinner v-else />
					</button>
				</div>
			</ValidationObserver>
			<div v-else class="message">
				<div class="info">
					<h2>successfully submitted</h2>
					<p>Thank you for filling out your information.</p>
				</div>
				<Btn @click.native="complete = false">okey</Btn>
			</div>
		</transition>
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
			number: String,
			message: String,
			action: 'Contact',
			emailTemplate: String,
		},
		loading: false,
		complete: false,
	}),
	computed: {},
	methods: {
		async Submit() {
			const isValid = await this.$refs.form_contact.validate()
			// validation
			if (!isValid) return

			this.loading = true
			console.log('loading')

			// compose email template
			this.form.emailTemplate = `
				<h4>email:</h4> <p>${this.form.email}</p>
			 	<h4>number:</h4> <p>${this.form.number}</p>
			 	<h4>message:</h4> <p>${this.form.message}</p>
			`

			// trigger netlify function
			try {
				await this.$axios.$post('.netlify/functions/sendmail', this.form)
			} catch (error) {
				console.log(error)
			}

			console.log('submited')
			this.loading = false
			this.complete = true
		},
		getEmail(value) {
			this.form.email = value
		},
		getSubject(value) {
			this.form.subject = value
		},
		getMessage(value) {
			this.form.message = value
		},
	},
}
</script>

<style lang="scss" scoped>
form {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	.wrap {
		width: 50%;
		max-width: 500px;
		height: 350px;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.info {
		width: max-content;
		min-width: 320px;
		border-left: 2px solid #fff;
		padding-left: 2rem;

		display: flex;
		flex-direction: column;

		h2 {
			text-transform: uppercase;
			margin-bottom: 1rem;
		}
		p {
			display: flex;
			justify-content: space-between;
		}
		a {
			text-decoration: none;
			font-size: 1rem;
			color: #fff;
			&:hover {
				opacity: 0.75;
			}
		}
		&.media a {
			text-transform: uppercase;
		}
		&.title h2 {
			margin: 0;
		}
	}
	.submit {
		width: 100%;
		height: 50px;
		margin-top: 50px;
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

.message {
	width: 100%;
	height: 350px;

	& > * {
		width: 100%;
		max-width: 400px;
		margin-bottom: 2rem;
	}
	.info {
		border-left: 2px solid #fff;
		padding-left: 1rem;
		h2 {
			text-transform: uppercase;
			margin-bottom: 20px;
		}
	}

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

@media (max-width: 1200px) {
	form {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.wrap {
			width: 100%;
			height: 100%;
			.info {
				height: max-content;
				padding-left: 1rem;
				margin-bottom: 40px;
				p {
					flex-direction: column;
					a {
						margin-bottom: 10px;
					}
				}
			}
		}
	}
}
</style>
