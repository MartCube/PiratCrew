<template>
	<section id="casting">
		<TextBox :text="$t('pages.casting')" />

		<div class="casting">
			<ValidationObserver ref="form_mail" tag="form" class="form" @submit.prevent="Submit()">
				<div class="wrap">
					<div class="info">
						<h2>PiratCrew casting form</h2>
						<p>Are you an artist trying to prove your skills ?</p>
						<p>Please fill the following form so we can continue to next step.</p>
					</div>
					<InputItem :name="'email'" :rules="'email|required'" @getValue="getEmail" />
					<InputItem :name="'name'" :rules="'required'" />
					<InputItem :name="'location'" :rules="'required'" />
				</div>
				<div class="wrap">
					<InputItem :name="'education'" :rules="'required'" />
					<InputItem :name="'experience'" :rules="'required'" />
					<InputItem :name="'link to promo video'" :rules="'required'" />

					<button v-if="!loading" type="submit" class="submit">
						<span>submit<i class="icon icon-mail" /></span>
					</button>
					<div v-else class="submit"><spinner /></div>
				</div>
			</ValidationObserver>
		</div>
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
			subject: String,
			message: String,
		},
		loading: false,
	}),
	methods: {
		getEmail(value) {
			this.form.email = value
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
.casting {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.form {
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
			height: 120px;
			border-left: 2px solid #fff;
			padding-left: 25px;

			display: flex;
			flex-direction: column;

			h2 {
				text-transform: uppercase;
				margin-bottom: 15px;
			}
			p {
				margin: 5px 0;
				user-select: text;
				line-height: 1.1;
				a {
					margin-left: 5px;
				}
			}
		}

		.submit {
			width: 100%;
			height: 50px;
			margin-top: 70px;
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
	#casting {
		padding: 40px;
	}
	.casting {
		padding: 0 1rem;
	}
}
</style>
