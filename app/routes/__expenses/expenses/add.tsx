import { Modal } from '~/components/util/Modal'
import { ExpenseForm } from '~/components/expenses/ExpenseForm'
import { useNavigate } from '@remix-run/react'
import { addExpense } from '~/data/expenses.server'
import type { ActionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { validateInput } from '~/data/validation.server'
import { requireUserSession } from '~/data/auth.server'

export default function ExpensesAddPage() {
  const navigate = useNavigate()

  const closeHandler = () => {
    navigate('..')
  }

  return (
    <div>
      <h1>AddExpenses</h1>
      <Modal onClose={closeHandler}>
        <ExpenseForm />
      </Modal>
    </div>
  )
}

export async function action({ request }: ActionArgs) {
  const userId = await requireUserSession(request)

  const data = await request.formData()
  const expenseData = Object.fromEntries(data)

  try {
    validateInput(expenseData)
  } catch (error) {
    return error
  }

  await addExpense(expenseData, userId)
  return redirect('/expenses')
}
