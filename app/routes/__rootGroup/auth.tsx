import { AuthForm } from '~/components/auth/authForm'
import type { ActionArgs } from '@remix-run/node'
import { validateCredentials } from '../../data/validation.server'
import { type Credentials, signup, login } from '~/data/auth.server'
import { redirect } from '@remix-run/node'

export default function AuthPage() {
  return (
    <div>
      <AuthForm />
    </div>
  )
}

export async function action({ request }: ActionArgs) {
  const searchParams = new URL(request.url).searchParams
  const authMode = searchParams.get('mode') || 'login'

  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log('auth form', data)
  try {
    validateCredentials(data)
  } catch (error) {
    return error
  }

  try {
    if (authMode === 'login') {
      return await login(data as unknown as Credentials)
    } else {
      return await signup(data as unknown as Credentials)
    }
  } catch (error: any) {
    if (error.status === 422) {
      return { credentials: error.message }
    }

    throw error
  }
}
