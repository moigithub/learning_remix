import { Link, /*Form, useSubmit,*/ useFetcher } from '@remix-run/react'

interface Props {
  id: string
  title: string
  amount: number
}

export const ExpenseListItem = ({ id, title, amount }: Props) => {
  // const submit = useSubmit()
  const fetcher = useFetcher()

  const handleDelete = () => {
    const proceed = confirm('Are you sure you want to delete?')
    // submit(null, { method: 'delete', action: `/expenses/${id}` })
    if (!proceed) return
    fetcher.submit(null, { method: 'delete', action: `/expenses/${id}` })
  }

  if (fetcher.state === 'idle') {
    ;<article>
      <p>Deleting...</p>
    </article>
  }

  return (
    <article>
      <div>
        <h2>{title}</h2>
        <p>${amount.toFixed(2)}</p>
      </div>
      <menu>
        <button onClick={handleDelete}>Delete</button>

        {/* <Form method='delete' action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  )
}
