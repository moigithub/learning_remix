function isValidEmail(email: string): boolean {
  return !!email && email.includes('@')
}

function isValidPassword(password: string): boolean {
  return !!password && password.trim().length >= 7
}

export function validateCredentials(input: any) {
  let errors: any = {}

  if (!isValidEmail(input.email)) {
    errors.email = 'invalid email'
  }

  if (!isValidPassword(input.password)) {
    errors.password = 'invalid password'
  }

  if (Object.keys(errors).length > 0) {
    throw errors
  }
}

function isValidTitle(value: string): boolean {
  return !!value && value.trim().length > 0 && value.trim().length <= 30
}

function isValidAmount(value: string): boolean {
  const amount = parseFloat(value)
  return !Number.isNaN(amount) && amount > 0
}

function isValidDate(value: string): boolean {
  return !!value && new Date(value).getTime() < new Date().getTime()
}

export function validateInput(input: any) {
  let errors: any = {}

  if (!isValidTitle(input.title)) {
    errors.title = 'invalid title'
  }

  if (!isValidAmount(input.amount)) {
    errors.amount = 'invalid amount'
  }

  if (!isValidDate(input.date)) {
    errors.date = 'invalid date'
  }

  if (Object.keys(errors).length > 0) {
    throw errors
  }
}
