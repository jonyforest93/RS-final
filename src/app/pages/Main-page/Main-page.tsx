import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'
import { getDiscountCode } from 'api/cart/getDiscountCode'

import Orders from './Orders'

import type { DiscountCode } from '@commercetools/platform-sdk'

export const MainPage: React.FC = () => {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([])

  useEffect(() => {
    getDiscountCode()
      .then(res => {
        setDiscountCodes(res)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <div className="paralax overflow-hidden">
        <div className="paralax-content container mx-auto flex flex-col items-center justify-start">
          <h1 className="main-title mt-[120px] text-center">Lover Flower</h1>
          <p className="mb-[50px] text-center text-xl font-normal tracking-wide text-white">
            We create for those who appreciate the freshness and grace of flowers
          </p>
          <Link to={`/catalog`}>
            <BaseButton variant="primary">view catalog</BaseButton>
          </Link>
          <div className="mt-[20px] flex gap-[15px]">
            <NavLink className="link" to="/login">
              Sign In
            </NavLink>
            <NavLink className="link" to="/registration">
              Sign Up
            </NavLink>
          </div>
          <div className="mt-5 flex flex-col items-center justify-center gap-5 text-white">
            <h2>Available Promocodes:</h2>
            <div className="flex gap-5 font-bold">
              {discountCodes.map(discountCode => {
                return <p key={discountCode.code}>{discountCode.code}</p>
              })}
            </div>
          </div>
        </div>
        <div className="mask"></div>
        <div className="signature"></div>
        <img
          src="images/mainPageImg/ellipse_blue.png"
          alt=""
          className="absolute bottom-[300px] left-0 object-cover opacity-50"
        />
        <img
          src="images/mainPageImg/ellipse_pink.png"
          alt=""
          className="absolute bottom-[400px] right-[-50px] object-cover opacity-60"
        />
      </div>
      <div className="orders relative overflow-hidden pb-6">
        <div className="container relative z-10 mx-auto">
          <h2 className="title">catalog</h2>
          <p className="text-lg font-light leading-[1.3] tracking-wider text-white lg:ml-16 lg:mt-7">
            We have the largest selection of flowers, bouquets, cards and gifts. We will always help you choose a
            bouquet for your event, our manager will advise you and help you make your choice
          </p>
          <div className="mt-[50px] flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-[40px] md:gap-y-[40px]">
              <div className="order-col-1">
                <Orders
                  title={'ready-made bouquets of dried flowers'}
                  list={['bouquets', 'for interior', 'compositions']}
                />
              </div>
              <div className="order-col-2 md:col-start-2 md:row-span-2 md:self-center">
                <Orders
                  title={'Flowers'}
                  list={['Prefabricated bouquets', 'Monobouquets', 'Flower arrangements', 'roses', 'wedding']}
                />
              </div>
              <div className="order-col-3 md:col-start-1 md:row-start-2">
                <Orders title={'additionally'} list={['balls', 'toys', 'postcards', 'package']} />
              </div>
            </div>
          </div>
        </div>
        <img
          src="images/mainPageImg/orders-pink.png"
          alt="orders-pink"
          className="absolute left-0 top-[000px] object-cover opacity-50"
        />
        <img
          src="images/mainPageImg/orders-blue.png"
          alt="orders-blue"
          className="absolute right-[-50px] top-[0px] object-cover opacity-60"
        />
      </div>
    </>
  )
}
