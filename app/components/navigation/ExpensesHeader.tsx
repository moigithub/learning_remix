import { NavLink, Link, Form } from '@remix-run/react'

export const ExpensesHeader = () => {
  return (
    <header>
      <Link to='/'>Logo</Link>

      <nav>
        <ul>
          <li>
            <NavLink to='/expenses' end>
              Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to='/expenses/analysis'>Analysis</NavLink>
          </li>
        </ul>
      </nav>
      <nav>
        <Form method='post' action='/logout'>
          <button>Logout</button>
        </Form>
      </nav>
    </header>
  )
}
