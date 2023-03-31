import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useCatch,
  useMatches
} from '@remix-run/react'
import type { PropsWithChildren } from 'react'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

const Document = ({ children, title }: PropsWithChildren<{ title?: string }>) => {
  const matches = useMatches()
  const isSomething = matches.some(match => match.handle?.something)
  console.log('issomething', isSomething)

  return (
    <html lang='en'>
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

const Error = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  )
}

export function CatchBoundary() {
  const error = useCatch()

  return (
    <Document title={error.statusText}>
      <main>
        CathBoundary
        <Error title={error.statusText}>
          <p>{error.data?.message || 'Something went wrong'}</p>
          <p>
            Back to <Link to='/'>home</Link>.
          </p>
        </Error>
      </main>
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Document>
      <main>
        ErrorBoundary
        <Error title={error.message}>
          <p>{error.message || 'Something went wrong'}</p>
          <p>
            Back to <Link to='/'>home</Link>.
          </p>
        </Error>
      </main>
    </Document>
  )
}
