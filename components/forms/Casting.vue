<template>
	<section id="casting">
		<TextBox :text="$t('pages.casting')" />

		<transition name="page" appear mode="out-in">
			<ValidationObserver v-if="!complete" ref="form_casting" tag="form" @submit.prevent="Submit()">
				<div class="wrap">
					<div class="info">
						<h2>piratcrew casting</h2>
						<p>Are you an artist trying to prove your skills ?</p>
						<p>Please fill the following so we can continue to next step.</p>
					</div>
					<InputItem labelName="name" :name="'name'" placeholder="name surname" :rules="'required'" @getValue="getName" />
					<InputItem labelName="email" :name="'email'" placeholder="your@email.com" :rules="'email|required'" @getValue="getEmail" />
					<InputItem labelName="number" :name="'number'" placeholder="(country code) phone number" :rules="'required'" @getValue="getNumber" />
					<InputItem labelName="birth date" :name="'birthDate'" placeholder="06.07.1990" :rules="'required'" @getValue="getBirthDate" />
				</div>
				<div class="wrap">
					<InputItem labelName="location" :name="'location'" placeholder="country, city" :rules="'required'" @getValue="getLocation" />
					<InputItem labelName="genre" :name="'genre'" placeholder="dancer, vocalist .." :rules="'required'" @getValue="getGenre" />
					<InputItem labelName="video" :name="'video'" placeholder="link to promo video" :rules="'required'" @getValue="getVideo" />
					<InputItem labelName="link" :name="'link'" placeholder="link to instagram" :rules="'required'" @getValue="getLink" />

					<button type="submit" class="submit">
						<span v-if="!loading">submit</span>
						<Spinner v-else />
					</button>
				</div>
			</ValidationObserver>
			<div v-else class="message">
				<div class="info">
					<h2>successfully submitted</h2>
					<p>Thank you for filling out your information.</p>
				</div>
				<ButtonItem @click.native="complete = false">okey</ButtonItem>
			</div>
		</transition>
	</section>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

export default {
	middleware: 'navigation',
	components: {
		ValidationObserver,
	},
	data: () => ({
		form: {
			date: String,
			email: String,
			name: String,
			number: String,
			birthDate: String,

			location: String,
			genre: String,
			video: String,
			link: String,
			action: 'Casting',
			// emailTemplate: '',
		},
		loading: false,
		complete: false,
	}),
	methods: {
		async Submit() {
			const isValid = await this.$refs.form_casting.validate()
			// validation
			if (!isValid) return

			this.loading = true
			this.form.date = this.currentData
			console.log(this.form)
		

			// compose email template
			// this.form.emailTemplate = `
			// 	<h4>email:</h4> <p>${this.form.email}</p>
			//  	<h4>name:</h4> <p>${this.form.name}</p>
			//  	<h4>location:</h4> <p>${this.form.location}</p>
			//  	<h4>education:</h4> <p>${this.form.education}</p>
			//  	<h4>number:</h4> <p>${this.form.number}</p>
			//  	<h4>video link:</h4> <p>${this.form.video}</p>
			// `

			// trigger google sheets
			const url = 'https://sheet.best/api/sheets/4efeaa29-2cbc-48ed-90ad-b3ec21258ff6'

			try {
				await this.$axios.post(
					// eslint-disable-next-line object-shorthand
					url, this.form
				).then(response => {
					console.log(response);
				})
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
		getName(value) {
			this.form.name = value
		},
		getNumber(value) {
			this.form.number = value
		},
		getLocation(value) {
			this.form.location = value
		},
		getGenre(value) {
			this.form.genre = value
		},
		getVideo(value) {
			this.form.video = value
		},
		getLink(value) {
			this.form.link = value
		},
		getBirthDate(value) {
			this.form.birthDate = value
		},
	},
	computed: {
		currentData () {
			const today = new Date()

			// Getting required values
			const year = today.getFullYear()
			const month = today.getMonth()
			const day = today.getDate()

			return `${day}-${month}-${year}`
		}
	}
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
		width: 100%;
		height: 100px;
		border-left: 2px solid #fff;
		padding-left: 2rem;

		display: flex;
		flex-direction: column;
		justify-content: space-around;
		h2 {
			text-transform: uppercase;
			margin-bottom: 20px;
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
	#casting {
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
					margin-bottom: 50px;
				}
			}
		}
	}
}
</style>
