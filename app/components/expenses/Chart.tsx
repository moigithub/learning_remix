import { ChartBar } from './ChartBar'
import type { Expense } from './models'

interface Props {
  expenses: Expense[]
}
export const Chart = ({ expenses }: Props) => {
  const chartData = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 }
  ]

  for (const expense of expenses) {
    const month = new Date(expense.date).getMonth() // start at 0
    chartData[month].value += expense.amount
  }

  const dataValues = chartData.map(data => data.value)
  const totalMax = Math.max(...dataValues)

  return (
    <section>
      <h2>Monthly expenses</h2>
      <ol
        style={{
          display: 'flex',
          border: '1px solid pink',
          padding: 20,
          height: 200,
          width: 'fit-content'
        }}
      >
        {chartData.map(data => (
          <ChartBar key={data.label} maxValue={totalMax} value={data.value} label={data.label} />
        ))}
      </ol>
    </section>
  )
}
