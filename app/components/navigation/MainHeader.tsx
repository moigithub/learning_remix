import { NavLink, Link, useLoaderData, Form } from '@remix-run/react'

export const MainHeader = () => {
  const userId = useLoaderData()

  return (
    <header>
      <Link to='/'>Logo</Link>

      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/pricing'>Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            {userId && (
              <Form method='post' action='/logout'>
                <button>Logout</button>
              </Form>
            )}
            {!userId && <Link to='/auth'>Login</Link>}
          </li>
        </ul>
      </nav>
    </header>
  )
}
