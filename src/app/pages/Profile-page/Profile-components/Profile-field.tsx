import type { ChangeEventHandler } from 'react'

interface IProfileAddressFieldProp {
  name: string
  value: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const ProfileField: React.FC<IProfileAddressFieldProp> = ({ name, value, onChange }) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="label">{name}</label>
      <input type="text" className="input" value={value} onChange={handleInputChange} />
    </div>
  )
}
