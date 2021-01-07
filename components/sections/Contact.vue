<template>
	<section id="contact">
		<TextBox :text="$t('pages.contact')" />
		<div class="contact">
			<div class="info">
				<div class="phone">
					<h2>call us</h2>
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
			<ValidationObserver ref="form_contact" tag="form" autocomplete="off" class="form" @submit.prevent="Submit()">
				<h2>write us</h2>
				<InputItem :name="'email'" :rules="'email|required'" @getValue="getEmail" />
				<InputItem :name="'subject'" :rules="'required'" @getValue="getSubject" />
				<InputItem :name="'message'" :rules="'required'" @getValue="getMessage" />

				<button type="submit" class="submit">
					<span v-if="!loading">submit<i class="icon icon-mail" /></span>
					<spinner v-else />
				</button>
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
			action: 'Contact',
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
			const isValid = await this.$refs.form_contact.validate()
			// validation
			if (!isValid) return

			this.loading = true
			console.log('loading')

			// compose email template
			this.form.emailTemplate = `<h4>email:</h4> <p>${this.form.email}</p> <h4>message:</h4> <p>${this.form.message}</p>`

			// trigger netlify function
			try {
				await this.$axios.$post('.netlify/functions/sendmail', this.form).then(() => {
					this.loading = false
					console.log('submited')
				})
			} catch (error) {
				console.log(error)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.contact {
	width: 100%;
	border-left: 2px solid white;
	border-right: 2px solid white;

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
		justify-content: flex-start;
		flex-basis: 40%;
		height: 350px;
		max-width: 300px;

		p {
			margin: 5px 0;
			user-select: text;
			line-height: 1.5rem;

			a {
				margin-left: 5px;
			}
		}
		a {
			font-size: 1rem;
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
		}
		.phone {
			margin-bottom: 50px;
			p {
				justify-content: space-between;
				display: flex;
			}
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
	.form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-basis: 40%;
		height: 350px;
	}
}

@media (max-width: 800px) {
	.contact {
		flex-direction: column-reverse;
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
		}
	}
}
</style>
