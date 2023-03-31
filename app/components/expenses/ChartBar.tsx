export const ChartBar = ({
  maxValue,
  value,
  label
}: {
  maxValue: number
  value: number
  label: string
}) => {
  let barFillHeight = '0%'

  if (maxValue > 0) {
    barFillHeight = Math.round((value / maxValue) * 100) + '%'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 10 }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'end' }}>
        <div style={{ width: 15, background: 'olive', height: barFillHeight }}></div>
      </div>
      <div>{label}</div>
    </div>
  )
}
