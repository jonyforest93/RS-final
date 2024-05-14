/* eslint-disable react/prop-types */
import { useState } from 'react'
interface IDefaultProps {
  isShipping: boolean
}

export const DefaultAdresses: React.FC<IDefaultProps> = ({ isShipping }) => {
  const [shippingDefault, setShippingDefault] = useState<boolean>(false)
  const [billingDefault, setBillingDefault] = useState<boolean>(false)

  const handleShipping: () => void = () => {
    setShippingDefault(!shippingDefault)
    if (billingDefault) {
      setBillingDefault(false)
    }
  }
  const handleBilling: () => void = () => {
    setBillingDefault(!billingDefault)
    if (shippingDefault) {
      setShippingDefault(false)
    }
  }
  return (
    <div>
      <div className="mt-5 flex gap-2 text-white">
        <input type="checkbox" id="shippingCheckbox" checked={shippingDefault} onChange={handleShipping} />
        <p>Use shipping address as default</p>
      </div>
      {isShipping ? (
        <div className="mt-5 flex gap-2 text-white">
          <input type="checkbox" id="billingCheckbox" checked={billingDefault} onChange={handleBilling} />
          <p>Use billing address as default</p>
        </div>
      ) : null}
    </div>
  )
}
