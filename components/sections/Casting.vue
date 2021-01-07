<template>
	<section id="casting">
		<TextBox :text="$t('pages.casting')" />

		<ValidationObserver ref="form_casting" class="casting" tag="form" @submit.prevent="Submit()">
			<div class="wrap">
				<div class="info">
					<h2>piratcrew casting</h2>
					<p>Are you an artist trying to prove your skills ?</p>
					<p>Please fill the following so we can continue to next step.</p>
				</div>
				<InputItem :name="'email'" :rules="'email|required'" @getValue="getEmail" />
				<InputItem :name="'name'" :rules="'required'" @getValue="getName" />
				<InputItem :name="'location'" :rules="'required'" @getValue="getLocation" />
			</div>
			<div class="wrap">
				<InputItem :name="'education'" :rules="'required'" @getValue="getEducation" />
				<InputItem :name="'experience'" :rules="'required'" @getValue="getExperience" />
				<InputItem :name="'link to promo video'" :rules="'required'" @getValue="getVideoLink" />

				<Submit />
			</div>
		</ValidationObserver>
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
			email: String,
			name: String,
			location: String,
			education: String,
			experience: String,
			videLink: String,
			action: 'Casting',
			emailTemplate: '',
		},
	}),
	methods: {
		getEmail(value) {
			this.form.email = value
		},
		getName(value) {
			this.form.name = value
		},
		getLocation(value) {
			this.form.location = value
		},
		getEducation(value) {
			this.form.email = value
		},
		getExperience(value) {
			this.form.experience = value
		},
		getVideoLink(value) {
			this.form.videLink = value
		},
		async Submit() {
			const isValid = await this.$refs.form_casting.validate()
			// validation
			if (!isValid) return

			this.loading = true
			console.log('loading')

			// compose email template
			this.form.emailTemplate = `
				<h4>email:</h4> <p>${this.form.email}</p>
			 	<h4>name:</h4> <p>${this.form.name}</p>
			 	<h4>location:</h4> <p>${this.form.location}</p>
			 	<h4>education:</h4> <p>${this.form.education}</p>
			 	<h4>experience:</h4> <p>${this.form.experience}</p>
			 	<h4>videLink:</h4> <p>${this.form.videLink}</p>
			`

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
.casting {
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

		h2 {
			text-transform: uppercase;
			margin-bottom: 20px;
		}
		p {
			margin-bottom: 10px;
			&:last-child {
				margin: 0;
			}
		}
	}
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
