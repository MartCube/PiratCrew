<template>
	<div class="form_group">
		<div v-if="errorMessage" class="error">
			{{ errorMessage }}
		</div>

		<input
			:id="name"
			v-model="value"
			:placeholder="placeholder"
			:type="type"
			class="form_field"
			:name="name"
			@blur="handleBlur"
			@change="emitValue"
		/>
		<label :for="name" class="form_label">{{ labelName }}</label>
	</div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { watch } from 'vue'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	labelName: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: 'input',
	},
	rules: {
		type: [Object, String],
		required: true,
	},
	mode: {
		type: String,
		default: 'lazy',
	},
})

const emit = defineEmits(['getValue'])

// Use vee-validate v4 useField composable
const { value, errorMessage, handleBlur } = useField(() => props.name, props.rules)

// Watch for value changes and emit to parent
watch(value, (newValue) => {
	emit('getValue', newValue)
})

const emitValue = () => {
	emit('getValue', value.value)
}
</script>

<style lang="scss" scoped>
@use '~/assets/mixins.scss' as *;

.form_group {
	position: relative;
	padding: 25px 0 0;
	width: 100%;
	.form_field {
		font-family: inherit;
		width: 100%;
		border: 0;
		border-bottom: 2px solid white;
		outline: 0;
		font-size: 1em;
		color: white;
		padding: 7px 0;
		background: transparent;
		transition: border-color 0.2s;
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus {
			-webkit-text-fill-color: #fff;
			box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0) inset;
			transition: background-color 5000s ease-in-out 0s;
		}
		&::placeholder {
			color: transparent;
		}
		&:placeholder-shown ~ .form_label {
			font-size: 1.1rem;
			cursor: text;
			top: 20px;
			color: white;
		}
		&:focus {
			~ .form_label {
				position: absolute;
				top: 0;
				display: block;
				transition: 0.2s;
				font-size: 0.7em;
				color: #aaaaaa;
				font-weight: 700;
			}
			&::placeholder {
				color: #aaaaaa;
			}
			padding-bottom: 6px;
			font-weight: 700;
			border-width: 3px;
			border-color: white;
			border-image-slice: 1;
		}
		/* reset input */
		&:required,
		&:invalid {
			box-shadow: none;
		}
	}
	.form_label {
		user-select: none;
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s;
		font-size: 0.8rem;
		color: #aaaaaa;
	}
	.error {
		position: absolute;
		top: 5px;
		right: 0;
		font-size: 0.8em;
		color: red;
		@include d-flex(row, center, center, initial);
		&.invalid {
			display: flex;
		}
	}
}

@media (max-width: 800px) {
	.form_group {
		margin-top: 1rem;
	}
}
</style>
