<template>
	<section id="casting">
		<TextBox :text="t('pages.casting')" />

		<div class="info">
			<!-- <h2>piratcrew casting</h2> -->
			<p>Are you an artist trying to prove your skills ?</p>
			<p>Please fill the following so we can continue to next step.</p>
		</div>
		<Form ref="casting_form" @submit="Submit">
			<div v-if="!complete">
				<div class="wrap">
					<InputItem label-name="name" :name="'name'" placeholder="name surname" :rules="'required'" @getValue="getName" />
					<InputItem label-name="email" :name="'email'" placeholder="your@email.com" :rules="'email|required'" @getValue="getEmail" />
					<InputItem label-name="number" :name="'number'" placeholder="(country code) phone number" :rules="'required'" @getValue="getNumber" />
					<InputItem label-name="birth date" :name="'birthDate'" placeholder="06.07.1990" :rules="'required'" @getValue="getBday" />
				</div>
				<div class="wrap">
					<InputItem label-name="location" :name="'location'" placeholder="country, city" :rules="'required'" @getValue="getLocation" />
					<InputItem label-name="genre" :name="'genre'" placeholder="dancer, vocalist .." :rules="'required'" @getValue="getGenre" />
					<InputItem label-name="video" :name="'video'" placeholder="link to promo video" :rules="'required'" @getValue="getVideo" />
					<InputItem label-name="link" :name="'link'" placeholder="link to instagram" :rules="'required'" @getValue="getLink" />

					<button type="submit" class="submit">
						<span v-if="!loading">submit</span>
						<Spinner v-else />
					</button>
				</div>
			</div>
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
				<ButtonItem @click="complete = false">okey</ButtonItem>
			</div>
		</Form>
	</section>
</template>

<script setup>
import { Form } from 'vee-validate'
import { ref, computed } from 'vue'
import * as emailjs from '@emailjs/browser'
import SheetDB from 'sheetdb-js'

const { t } = useI18n()

const form = ref({
	date: '',
	name: '',
	email: '',
	phone: '',
	birth: '',
	location: '',
	genre: '',
	video: '',
	instagram: '',
})

const loading = ref(false)
const complete = ref(false)
const isSuccess = ref(false)

const casting_form = ref(null)

const currentData = computed(() => new Date().toLocaleDateString())

async function Submit(values) {
	// validation is automatically done by vee-validate Form component
	loading.value = true

	// Update form values from validation
	form.value = { ...values, date: currentData.value }

	await emailjs.sendForm(
		'default_service',
		'template_uvfe0gg',
		casting_form.value,
		'wGoXfD98B08dUh-BC'
	).then(
		(result) => {
			console.log('SUCCESS!', result.text)
			loading.value = false
			complete.value = true
			isSuccess.value = true
		},
		(error) => {
			console.log('FAILED...', error.text)
			loading.value = false
			complete.value = true
		}
	)

	await SheetDB.write('https://sheetdb.io/api/v1/l4xx2lrxtz7oe', {
		sheet: 'ArtistForm',
		data: form.value,
	})
		.then((result) => {
			console.log(result.created)
			isSuccess.value = true
			complete.value = true
			loading.value = false
		})
		.catch((error) => {
			console.log(error)
			isSuccess.value = false
			complete.value = true
			loading.value = false
		})

	console.log('submited')
}

function getEmail(value) {
	form.value.email = value
}
function getName(value) {
	form.value.name = value
}
function getNumber(value) {
	form.value.phone = value
}
function getLocation(value) {
	form.value.location = value
}
function getBday(value) {
	form.value.birth = value
}
function getGenre(value) {
	form.value.genre = value
}
function getVideo(value) {
	form.value.video = value
}
function getLink(value) {
	form.value.instagram = value
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
