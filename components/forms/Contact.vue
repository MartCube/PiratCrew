<template>
	<section id="contact">
		<TextBox :text="$t('pages.contact')" />

		<transition name="page" appear mode="out-in">
			<div class="wrapper">
				<div class="wrap">
					<div class="info media">
						<h2>{{$t('contact.follow')}}</h2>
						<p>
							<a href="https://www.facebook.com/piratcrewshow/">facebook</a>
							<a href="https://www.youtube.com/channel/UCJjlUOVeQyATgVOqGss6C_Q">youtube</a>
							<a href="https://www.instagram.com/piratcrew/">instagram</a>
						</p>
					</div>
					<div class="info phone">
						<h2>{{$t('contact.phone')}}</h2>
						<p>Viber <a href="tel:+3806731739455">+380 67 317 39 45</a></p>
						<p>WhatsApp <a href="tel:+3806731739455">+380 67 317 39 45</a></p>
					</div>
					<div class="info mail">
						<h2>{{$t('contact.email')}}</h2>
						<p><a href="mailto:piratcrew.info@gmail.com">piratcrew.info@gmail.com</a></p>
					</div>
				</div>
				<div class="wrap">
					<h2 class="title">{{$t('contact.write_us')}}</h2>
					<form ref="form_contact" @submit.prevent="Submit()">
						<ValidationObserver v-if="!complete" ref="form_contact_validation" tag="div">
							<InputItem :label-name="$t('contact.name')" :name="'name'" placeholder="Alice Wonder" :rules="'required'" @getValue="getName" />
							<InputItem :label-name="$t('contact.email')" :name="'email'" placeholder="your@email.com" :rules="'email|required'" @getValue="getEmail" />
							<InputItem :label-name="$t('contact.phone')" :name="'number'" placeholder="(country code) phone number" :rules="'required'" @getValue="getNumber" />
							<InputItem :label-name="$t('contact.message')" :name="'message'" placeholder="your message .." :rules="'required'" @getValue="getMessage" />

							<button type="submit" class="submit">
								<span v-if="!loading">{{ $t('contact.submit') }}</span>
								<Spinner v-else />
							</button>
						</ValidationObserver>
						<div v-else class="message">
							<div class="info">
								<template v-if="isSuccess">
									<h2>{{ $t('contact.success_title') }}</h2>
									<p>{{ $t('contact.success_message') }}</p>
								</template>
								<template v-else>
									<h2>{{ $t('contact.error_title') }}</h2>
									<p>{{ $t('contact.error_message') }}</p>
								</template>
							</div>
							<ButtonItem @click.native="complete = false">{{ $t('contact.okey') }}</ButtonItem>
						</div>
					</form>
				</div>
			</div>
		</transition>
	</section>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import * as emailjs from '@emailjs/browser'

export default {
	components: {
		ValidationObserver,
	},
	data: () => ({
		form: {
			email: String,
			number: String,
			name: String,
			message: String,
		},
		loading: false,
		isSuccess: false,
		complete: false,
	}),
	methods: {
		async Submit() {
			const isValid = await this.$refs.form_contact_validation.validate()
			// validation
			if (!isValid) return

			this.loading = true
			console.log('loading')

			// compose email template
			emailjs
				.sendForm('default_service', 'template_wy3mrgb', this.$refs.form_contact, 'wGoXfD98B08dUh-BC')
				.then(
					(result) => {
						console.log('SUCCESS!', result.text)
						this.isSuccess = true
					},
					(error) => {
						console.log('FAILED...', error.text)
					},
				)
				.finally(() => {
					this.loading = false
					this.complete = true
				})
		},
		getName(value) {
			this.form.name = value
		},
		getEmail(value) {
			this.form.email = value
		},
		getNumber(value) {
			this.form.number = value
		},
		getMessage(value) {
			this.form.message = value
		},
	},
}
</script>

<style lang="scss" scoped>
.wrapper {
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
		.title {
			border-left: 2px solid #fff;
			padding-left: 2rem;

			text-transform: uppercase;
			margin-bottom: 1rem;
			font-weight: 400;
		}
	}
	.info {
		width: max-content;
		min-width: 320px;
		min-height: 80px;
		border-left: 2px solid #fff;
		padding-left: 2rem;

		display: flex;
		flex-direction: column;
		justify-content: space-around;
		h2 {
			text-transform: uppercase;
			margin-bottom: 1rem;
			font-weight: 400;
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

		// font-family: 'codec_bold';
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
		margin-bottom: 2rem;
	}
	.info {
		border-left: 2px solid #fff;
		padding-left: 2rem;
		h2 {
			text-transform: uppercase;
			line-height: 3rem;
			margin-bottom: 20px;
			font-weight: 400;
		}
	}

	display: flex;
	flex-direction: column;
}

@media (max-width: 800px) {
	.wrapper {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.wrap {
			max-width: 100%;
			width: 100%;
			height: 100%;
			.info {
				height: max-content;
				width: 100%;
				// padding-left: 1rem;
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
