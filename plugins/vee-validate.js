import { defineRule, configure } from 'vee-validate'

export default defineNuxtPlugin(() => {
  // Реєструємо правила валідації вручну (без @vee-validate/rules)
  defineRule('required', (value) => {
    if (!value || !value.length) {
      return ' empty field'
    }
    return true
  })

  defineRule('email', (value) => {
    if (!value || !value.length) {
      return true // не обов'язкове поле
    }
    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(value)) {
      return 'email not valid'
    }
    return true
  })

  // Глобальна конфігурація
  configure({
    generateMessage: (ctx) => {
      return ctx.rule.message || `The field ${ctx.field} is invalid`
    }
  })
})
