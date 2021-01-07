<template>
	<section id="casting">
		<TextBox :text="$t('pages.casting')" />

		<ValidationObserver ref="form_mail" class="casting" tag="form" @submit.prevent="Submit()">
			<div class="wrap">
				<div class="info">
					<h2>piratcrew casting</h2>
					<p>Are you an artist trying to prove your skills ?</p>
					<p>Please fill the following so we can continue to next step.</p>
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
			action: 'Casting',
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

			this.loading = true
			console.log('loading')

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
