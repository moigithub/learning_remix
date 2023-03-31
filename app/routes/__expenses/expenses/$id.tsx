import { type Params, useNavigate } from '@remix-run/react'
import { ExpenseForm } from '~/components/expenses/ExpenseForm'
import { Modal } from '~/components/util/Modal'
import { deleteExpense, udpateExpense } from '~/data/expenses.server'
// import { getExpense } from '~/data/expenses.server'
import { type ActionArgs, redirect } from '@remix-run/node'
import { validateInput } from '../../../data/validation.server'
import { type RouteData } from '@remix-run/react/dist/routeData'

export default function ExpensesUpdatePage() {
  const navigate = useNavigate()

  const closeHandler = () => {
    navigate('..')
  }

  return (
    <div>
      <h1>Expenses update</h1>
      <Modal onClose={closeHandler}>
        <ExpenseForm />
      </Modal>
    </div>
  )
}

// export async function loader({ params }:LoaderArgs) {
//   return getExpense(params.id)
// }

export async function action({ params, request }: ActionArgs) {
  const id = params.id
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  if (request.method === 'PATCH') {
    try {
      validateInput(data)
    } catch (error) {
      return error
    }

    await udpateExpense(id!, data)
    return redirect('/expenses')
  } else if (request.method === 'DELETE') {
    await deleteExpense(id!)
    return { id }
  }
}

export function meta({
  // data,
  // location,
  // matches,
  params,
  parentsData
}: {
  params: Params
  parentsData: Record<string, any> & RouteData
}) {
  const expensesLoaded = parentsData['routes/__expenses/expenses']

  const expense = expensesLoaded?.find((expense: any) => expense.id === params.id)
  return {
    title: expense?.title,
    description: 'some description'
  }
}
