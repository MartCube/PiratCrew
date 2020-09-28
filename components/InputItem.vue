<template>
	<ValidationProvider v-slot="{ errors, classes }" :rules="rules" :mode="mode" tag="div" class="form_group">
		<div v-if="errors.length" class="error" :class="classes">
			{{ errors[0] }}
			<i class="icon icon-attention" />
		</div>

		<input :id="name" v-model="input_value" :type="type" class="form_field" :placeholder="name" :name="name" @change="emitValue" />
		<label :for="name" class="form_label">{{ name }}</label>
	</ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
	components: {
		ValidationProvider,
	},
	props: {
		name: {
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
	},
	data: () => ({
		input_value: '',
	}),
	methods: {
		emitValue(event) {
			this.$emit('getValue', this.input_value)
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~/assets/colors.scss';
@import '~/assets/mixins.scss';

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
		}
		&:focus {
			~ .form_label {
				position: absolute;
				top: 0;
				display: block;
				transition: 0.2s;
				font-size: .7em;
				color: #aaaaaa;
				font-weight: 700;
			}
			padding-bottom: 6px;
			font-weight: 700;
			border-width: 3px;
			border-color: white;
			border-image-slice: 1;
		}
	}
	.form_label {
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s;
		font-size: 1em;
		color: white;
	}
	.error {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 0.8em;
		color: white;
		@include d-flex(row, center, center, initial);
		.icon {
			color: red;
			margin-left: 5px;
		}
		&.invalid {
			display: flex;
		}
	}
}

/* reset input */
.form_field {
	&:required,
	&:invalid {
		box-shadow: none;
	}
}

@media (max-width: 600px) {
	.form_group{
		margin-top: 1rem;
		button{
			margin-top: 2rem;
		}
	}
}
</style>
