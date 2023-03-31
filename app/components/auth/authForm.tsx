import { Link, useSearchParams, Form, useNavigation, useActionData } from '@remix-run/react'
export const AuthForm = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state !== 'idle'
  const errors = useActionData()

  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'login'

  const submitBtnLabel = mode === 'login' ? 'Login' : 'Signup'
  const submitBtnText = mode === 'login' ? 'Create a new user' : 'Log in with existing user'
  const submitPath = mode === 'login' ? '?mode=signup' : '?mode=login'

  return (
    <Form method='post' id='auth-form'>
      <p>
        <label htmlFor='email'>Email Address</label>
        <input type='email' id='email' name='email' required />
      </p>
      <p>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' minLength={7} />
      </p>
      {errors && (
        <ul>
          {Object.values<string>(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div>
        <button disabled={isSubmitting}>{submitBtnLabel}</button>
        <Link to={submitPath}>{submitBtnText}</Link>
      </div>
    </Form>
  )
}
