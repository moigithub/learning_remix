import { type ActionArgs, json } from '@remix-run/node'
import { destroyUserSession } from '~/data/auth.server'

export function action({ request }: ActionArgs) {
  if (request.method !== 'POST') {
    throw json({ message: 'invalid request' }, { status: 400 })
  }

  return destroyUserSession(request)
}
