import { FC } from 'react'

export const Range: FC<{
  min: number
  max: number
  value: number
  step: number
  onChange: (value: number) => void
}> = ({ onChange, min, max, value, step }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      className="range range-"
      step={step}
      onChange={(e) => {
        onChange(+e.target.value)
      }}
    />
  )
}
