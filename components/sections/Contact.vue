<template>
	<section id="contact">
		<TextBox text="contact" />
		<div class="contact">
			<div class="info">
				<div class="adress">
					<h2>write us <i class="icon icon-right" /></h2>
				</div>
				<div class="adress">
					<h2>adress <i class="icon icon-location" /></h2>
					<p>Ukraine, Kyiv. Kreschatik 322</p>
				</div>
				<div class="phone">
					<h2>phone <i class="icon icon-phone" /></h2>
					<p>viber +380 492 322 105</p>
					<p>what's up +380 492 322 105</p>
				</div>
			</div>
			<ValidationObserver ref="send_email" tag="form" class="form" @submit.prevent="Submit()">
				<InputItem :name="'email'" :rules="'email|required'" @getValue="getEmail" />
				<InputItem :name="'subject'" :rules="'required'" @getValue="getSubject" />
				<InputItem :name="'message'" :rules="'required'" @getValue="getMessage" />

				<button v-if="!loading" type="submit" class="submit">
					<span>submit<i class="icon icon-mail" /></span>
				</button>
				<div v-else class="submit"><spinner /></div>
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
			const isValid = await this.$refs.send_email.validate()
			if (!isValid) return
			console.log('submit')
			this.loading = !this.loading
		},
	},
}
</script>

<style lang="scss" scoped>
.contact {
	width: 100%;

	display: flex;
	justify-content: space-evenly;
	align-items: center;
	align-content: center;
	.info {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		flex-basis: 40%;
		height: 350px;

		h2 {
			text-transform: uppercase;
			margin: 15px 0;
		}
		p {
			margin: 5px 0;
			user-select: text;
		}
	}
	.form {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
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

@media (max-width: 600px) {
}
</style>
