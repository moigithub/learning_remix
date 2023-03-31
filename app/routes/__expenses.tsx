import { Outlet } from '@remix-run/react'
import { ExpensesHeader } from '~/components/navigation/ExpensesHeader'
import styles from '~/styles/expenses.css'

export default function ExpensesLayoutGroup() {
  return (
    <>
      Expenses layout (group)
      <ExpensesHeader />
      <Outlet />
    </>
  )
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}
