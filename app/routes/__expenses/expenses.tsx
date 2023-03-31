import { Outlet, Link, useLoaderData } from '@remix-run/react'
import { ExpensesList } from '~/components/expenses/ExpensesList'

import { getExpenses } from '~/data/expenses.server'
import { type LoaderArgs } from '@remix-run/node'
import { requireUserSession } from '~/data/auth.server'

export default function ExpensesLayout() {
  const expenses = useLoaderData()
  const hasExpenses = expenses && expenses.length > 0

  return (
    <div>
      expnses layout
      <Outlet />
      <section>
        <Link to='add'>Add expense</Link>
        <a href='/expenses/raw'>Raw data</a>
      </section>
      {hasExpenses && <ExpensesList expenses={expenses} />}
      {!hasExpenses && (
        <section>
          <h1>No expenses found</h1>
          <p>
            <Link to='add'>Add expense</Link>
          </p>
        </section>
      )}
    </div>
  )
}

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request)
  return getExpenses(userId)
}
