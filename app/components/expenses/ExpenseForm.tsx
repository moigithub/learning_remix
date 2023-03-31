import {
  Form,
  Link,
  useActionData,
  useNavigation,
  // useSubmit  ,
  // useLoaderData,
  useParams,
  useMatches
} from '@remix-run/react'

export const ExpenseForm = () => {
  const errors = useActionData()
  // const expense = useLoaderData()
  const params = useParams()
  const matches = useMatches()
  const expensesLoaded = matches.find(match => match.id === 'routes/__expenses/expenses')?.data
  const expense = expensesLoaded?.find((expense: any) => expense.id === params.id)
  // const submit = useSubmit()

  const navigation = useNavigation()
  const isSubmitting = navigation.state !== 'idle'

  if (params.id && !expense) {
    return <p>Invalid id</p>
    // or
    // throw new Response("invalid id") + CatchBoundary
  }

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()

  //   const formData = new FormData(event.currentTarget)
  //   submit(formData, { action: '/expenses/add', method: 'post' })
  // }

  const today = new Date().toISOString().slice(0, 10)
  const values = expense
    ? {
        title: expense.title,
        amount: expense.amount,
        date: expense.date ? expense.date.slice(0, 10) : ''
      }
    : { title: '', amount: '', date: '' }

  return (
    <Form method={expense ? 'patch' : 'post'} /*onSubmit={handleSubmit}*/>
      <p>
        <label htmlFor='title'>Expense title</label>
        <input
          type='text'
          id='title'
          name='title'
          defaultValue={values.title}
          required
          maxLength={30}
        />
      </p>

      <div>
        <p>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            id='amount'
            name='amount'
            step='0.01'
            defaultValue={values.amount}
            required
          />
        </p>

        <p>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            id='date'
            name='date'
            max={today}
            defaultValue={values.date}
            required
          />
        </p>
      </div>

      {errors && (
        <ul>
          {Object.values<string>(errors).map(value => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      )}

      <div>
        <button disabled={isSubmitting}>{isSubmitting ? '...saving' : 'Save'}</button>
        <Link to='..'>Cancel</Link>
      </div>
    </Form>
  )
}
