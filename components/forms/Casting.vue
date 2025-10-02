<template>
	<section id="casting">
		<TextBox :text="t('pages.casting')" />

		<div class="info">
			<p>{{ t('casting.subtittle1') }}</p>
			<p>{{ t('casting.subtittle2') }}</p>
		</div>
		<Form ref="casting_form" @submit="Submit">
			<div v-if="!complete">
				<div class="wrap">
					<InputItem :label-name="t('contact.name')" :name="'name'" placeholder="name surname" :rules="'required'" />
					<InputItem :label-name="t('contact.email')" :name="'email'" placeholder="your@email.com" :rules="'email|required'" />
					<InputItem :label-name="t('contact.phone')" :name="'number'" placeholder="(country code) phone number" :rules="'required'" />
					<InputItem :label-name="t('contact.birthDate')" :name="'birthDate'" placeholder="06.07.1990" :rules="'required'" />
				</div>
				<div class="wrap">
					<InputItem :label-name="t('contact.location')" :name="'location'" placeholder="country, city" :rules="'required'" />
					<InputItem :label-name="t('contact.genre')" :name="'genre'" placeholder="dancer, vocalist .." :rules="'required'" />
					<InputItem :label-name="t('contact.video')" :name="'video'" placeholder="link to promo video" :rules="'required'" />
					<InputItem :label-name="t('contact.instagram')" :name="'instagram'" placeholder="link to instagram" :rules="'required'" />

					<button type="submit" class="submit">
						<span v-if="!loading">{{t('contact.submit')}}</span>
						<Spinner v-else />
					</button>
				</div>
			</div>
			<div v-else class="message">
				<div class="info">
					<template v-if="isSuccess">
						<h2>{{ t('casting.successf') }}</h2>
						<p>{{ t('contact.success_message') }}</p>
					</template>
					<template v-else>
						<h2>{{ t('contact.error_title') }}</h2>
						<p>{{ t('contact.error_message') }}</p>
					</template>
				</div>
				<ButtonItem @click="complete = false">{{ t('contact.okey') }}</ButtonItem>
			</div>
		</Form>
	</section>
</template>

<script setup>
import { Form } from 'vee-validate'
import * as emailjs from '@emailjs/browser'

const { t } = useI18n()

const loading = ref(false)
const complete = ref(false)
const isSuccess = ref(false)

const casting_form = ref(null)

const currentData = computed(() => new Date().toLocaleDateString())

async function Submit(values) {
	// validation is automatically done by vee-validate Form component
	loading.value = true

	// Prepare form data with current date
	const formData = { ...values, date: currentData.value }

	try {
		// EmailJS відправка
		const emailResult = await emailjs.send(
			'default_service',
			'template_uvfe0gg',
			formData,
			'wGoXfD98B08dUh-BC'
		)
		console.log('EmailJS SUCCESS!', emailResult.text)

		// SheetDB відправка через fetch API
		try {
			const response = await fetch('https://sheetdb.io/api/v1/l4xx2lrxtz7oe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data: formData })
			})

			if (response.ok) {
				const sheetResult = await response.json()
			} else {
				const errorText = await response.text()
			}
		} catch (sheetError) {
			console.log('SheetDB fetch failed:', sheetError)
		}

		// Успіх якщо EmailJS працює
		isSuccess.value = true
		complete.value = true

	} catch (error) {
		isSuccess.value = false
		complete.value = true
	} finally {
		loading.value = false
	}

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
