import { Chart } from '~/components/expenses/Chart'
import { getExpenses } from '~/data/expenses.server'
import { useLoaderData } from '@remix-run/react'
import { json, type LoaderArgs } from '@remix-run/node'
import { requireUserSession } from '~/data/auth.server'

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData()

  return (
    <div>
      <Chart expenses={expenses} />
    </div>
  )
}

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request)

  const expenses = await getExpenses(userId)
  if (expenses.length > 0) {
    throw json('no expenses found', { status: 404 })
  }
  return expenses
}

export function CatchBoundary() {
  return <div>No expenses found</div>
}
