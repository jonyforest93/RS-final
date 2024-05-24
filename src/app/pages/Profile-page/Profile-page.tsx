import { ProfileImages } from './Profile-images'

import type { Customer } from '@commercetools/platform-sdk'

interface IProfileProps {
  user: Customer
}

export const Profile: React.FC<IProfileProps> = ({ user }) => {
  return (
    <main className="relative flex flex-grow flex-col items-center justify-between overflow-hidden pb-10 text-white">
      <h1 className="title mt-28">User Profile</h1>
      <h2 className="title text-2xl">Main information</h2>
      <div className="relative z-20  min-w-[500px]">
        <div className="flex flex-col gap-3">
          <label className="label">First Name</label>
          <input type="text" className="input" value={user.firstName} disabled={true} />
        </div>
        <div className="flex flex-col gap-3">
          <label className="label">Last Name</label>
          <input type="text" className="input" value={user.lastName} disabled={true} />
        </div>
        <div className="flex flex-col gap-3">
          <label className="label">Date of Birth</label>
          <input type="text" className="input" value={user.dateOfBirth} disabled={true} />
        </div>
      </div>
      <h2 className="title mt-4 text-2xl">Adresses</h2>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {user.addresses.length
          ? user.addresses.map((adress, index) => {
              return (
                <div className="flex  flex-col items-center " key={index}>
                  <div className="flex w-[500px] flex-col gap-3">
                    <h3 className="text-center">{`Adress ${index + 1}`}</h3>
                    <div className="flex flex-col gap-3">
                      <label className="label">Country</label>
                      <input type="text" className="input" value={adress.country} disabled={true} />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="label">City</label>
                      <input type="text" className="input" value={adress.city} disabled={true} />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="label">Street</label>
                      <input type="text" className="input" value={adress.streetName} disabled={true} />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="label">Postal Code</label>
                      <input type="text" className="input" value={adress.postalCode} disabled={true} />
                    </div>
                  </div>
                </div>
              )
            })
          : null}
      </div>
      <ProfileImages />
    </main>
  )
}
