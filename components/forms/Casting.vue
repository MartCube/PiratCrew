<template>
	<section id="casting">
		<TextBox :text="$t('pages.casting')" />

		<!-- <transition name="page" appear mode="out-in"> -->
		<div class="info">
			<!-- <h2>piratcrew casting</h2> -->
			<p>Are you an artist trying to prove your skills ?</p>
			<p>Please fill the following so we can continue to next step.</p>
		</div>
		<form ref="casting_form" @submit.prevent="Submit()">
			<ValidationObserver v-if="!complete" ref="casting_form_validation" tag="div">
				<div class="wrap">
					<InputItem label-name="name" :name="'name'" placeholder="name surname" :rules="'required'" />
					<InputItem label-name="email" :name="'email'" placeholder="your@email.com" :rules="'email|required'" />
					<InputItem label-name="number" :name="'number'" placeholder="(country code) phone number" :rules="'required'" />
					<InputItem label-name="birth date" :name="'birthDate'" placeholder="06.07.1990" :rules="'required'" />
				</div>
				<div class="wrap">
					<InputItem label-name="location" :name="'location'" placeholder="country, city" :rules="'required'" />
					<InputItem label-name="genre" :name="'genre'" placeholder="dancer, vocalist .." :rules="'required'" />
					<InputItem label-name="video" :name="'video'" placeholder="link to promo video" :rules="'required'" />
					<InputItem label-name="link" :name="'link'" placeholder="link to instagram" :rules="'required'" />

					<button type="submit" class="submit">
						<span v-if="!loading">submit</span>
						<Spinner v-else />
					</button>
				</div>
			</ValidationObserver>
			<div v-else class="message">
				<div class="info">
					<template v-if="isSuccess">
						<h2>successfully submitted</h2>
						<p>Thank you for filling out your information.</p>
					</template>
					<template v-else>
						<h2>Something went wrong</h2>
						<p>Please try again</p>
					</template>
				</div>
				<ButtonItem @click.native="complete = false">okey</ButtonItem>
			</div>
		</form>
		<!-- </transition> -->
	</section>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import * as emailjs from '@emailjs/browser'
export default {
	middleware: 'navigation',
	components: {
		ValidationObserver,
	},
	data: () => ({
		form: {
			email: '',
			name: '',
			number: '',

			location: '',
			genre: '',
			videLink: '',

			action: 'Casting',
			// emailTemplate: '',
		},
		loading: false,
		complete: false,
		isSuccess: false,
	}),
	computed: {
		currentData() {
			const today = new Date()

			// Getting required values
			const year = today.getFullYear()
			const month = today.getMonth()
			const day = today.getDate()

			return `${day}-${month}-${year}`
		},
	},
	methods: {
		async Submit() {
			const isValid = await this.$refs.casting_form_validation.validate()
			// validation
			if (!isValid) return

			this.loading = true
			this.form.date = this.currentData

			emailjs.sendForm('default_service', 'template_uvfe0gg', this.$refs.casting_form, 'wGoXfD98B08dUh-BC').then(
				(result) => {
					console.log('SUCCESS!', result.text)
					this.loading = false
					this.complete = !this.complete
					this.isSuccess = true
				},
				(error) => {
					console.log('FAILED...', error.text)
					this.loading = false
					this.complete = !this.complete
				},
			)

			console.log('submited')
			this.loading = false
			this.complete = true
		},
	},
}
</script>

<style lang="scss" scoped>
.info {
	width: 100%;
	// height: 100px;
	border-left: 2px solid #fff;
	padding-left: 2rem;
	margin-bottom: 2rem;

	display: flex;
	flex-direction: column;
	justify-content: space-around;
	h2 {
		text-transform: uppercase;
		margin-bottom: 20px;
	}
}
form div {
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
	#casting {
		form div {
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.wrap {
				width: 100%;
				height: 100%;
				.info {
					height: max-content;
					padding-left: 1rem;
					margin-bottom: 50px;
				}
			}
		}
	}
}
</style>
