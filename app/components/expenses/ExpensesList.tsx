import { ExpenseListItem } from './ExpenseListItem'
import type { Expense } from './models'
interface Props {
  expenses: Expense[]
}

export const ExpensesList = ({ expenses }: Props) => {
  return (
    <ol>
      {expenses.map(expense => (
        <li key={expense.id}>
          <ExpenseListItem id={expense.id} title={expense.title} amount={expense.amount} />
        </li>
      ))}
    </ol>
  )
}
