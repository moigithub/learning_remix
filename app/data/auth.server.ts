import { hash, compare } from 'bcryptjs'
import { prisma } from './database.server'
import { createCookieSessionStorage, redirect } from '@remix-run/node'

export interface Credentials {
  email: string
  password: string
}

const SESSION_SECRET = process.env.SESSION_SECRET || 'sekret'
const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, //30 days
    httpOnly: true
  }
})

async function createUserSession(userId: string, redirectPath: string) {
  const session = await sessionStorage.getSession()
  session.set('userId', userId)
  return redirect(redirectPath, {
    headers: { 'Set-Cookie': await sessionStorage.commitSession(session) }
  })
}

export async function getUserFromSession(request: Request): Promise<string | null> {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  const userId = session.get('userId')

  if (!userId) {
    return null
  }
  return userId
}

export async function requireUserSession(request: Request): Promise<string> {
  const userId = await getUserFromSession(request)
  if (!userId) {
    throw redirect('/auth?mode=login')
  }
  return userId
}

export async function destroyUserSession(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  return redirect('/', {
    headers: { 'Set-Cookie': await sessionStorage.destroySession(session) }
  })
}

export async function signup({ email, password }: Credentials) {
  const userExist = await prisma.user.findFirst({ where: { email } })
  if (userExist) {
    throw new Response('already exist', { status: 422 })
  }

  const passwordHash = await hash(password, 12)
  const user = await prisma.user.create({ data: { email, password: passwordHash } })
  return createUserSession(user.id, '/expenses')
}

export async function login({ email, password }: Credentials) {
  const user = await prisma.user.findFirst({ where: { email } })
  if (!user) {
    throw new Response('invalid credentials', { status: 401 })
  }

  const match = await compare(password, user.password)
  if (!match) {
    throw new Response('invalid credentials', { status: 401 })
  }
  return createUserSession(user.id, '/expenses')
}
