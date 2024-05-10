import Form from 'components/Form/Form'

import Link from '../../components/Link'
import { LoginImages } from './login-Images'
import { fields } from './login-filds-data/login-filds-data'

import type { OnDataSend } from 'types/types'

export const LoginPage: React.FC = () => {
  const onDataSend: OnDataSend = data => {
    return data
  }
  return (
    <main className=" relative  flex-grow bg-[#282828]">
      <h2 className=" title mt-24 text-center max-lg:text-7xl max-md:text-6xl max-sm:text-5xl">Welcome Back! </h2>
      <p className="basic-text  text-center">Log In to access your account. </p>
      <div className="m-auto max-w-lg px-[10px]">
        <Form fields={fields} onDataSend={onDataSend}></Form>
        <Link href="/registration">Create Account</Link>
      </div>
      <LoginImages />
    </main>
  )
}
