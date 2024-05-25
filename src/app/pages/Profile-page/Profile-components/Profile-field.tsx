interface IProfileAdressFieldProp {
  name: string
  value: string
}

export const ProfileField: React.FC<IProfileAdressFieldProp> = ({ name, value }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="label">{name}</label>
      <input type="text" className="input" value={value} disabled={true} />
    </div>
  )
}
