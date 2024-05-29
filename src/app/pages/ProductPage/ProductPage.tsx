import Orders from './Orders'
import { ProductImages } from './ProductBackgroundImages'
import { ProductComponent } from './ProductComponent'

import type { IproductData } from 'types/types'

export const ProductPage: React.FC<IproductData> = productData => {
  return (
    <main className="relative  flex flex-col ">
      <ProductImages />
      <ProductComponent {...productData} />
      <div className=" relative flex overflow-hidden px-2 pb-28">
        <div className="  mx-auto">
          <h3 className="list-title mb-11 mt-20 text-center text-[#D978AC]">In addition to ordering:</h3>
          <div className="mx-auto flex gap-7 max-md:flex-col">
            <Orders
              title={'Fertilizers for cut flowers'}
              description={
                'If you indicate this in your wishes for the bouquet, we will include a bag of fertilizer for you'
              }
            ></Orders>
            <Orders
              title={"let's sign postcard"}
              description={
                'In your wishes for the bouquet, indicate the text you want to place and select the card itself on the website'
              }
            ></Orders>
            <Orders
              title={'Photo of the bouquet before sending'}
              description={
                'Please indicate in the order notes about this and we will send a photo of the finished bouquet before delivery. On holidays due to With a heavy workload this is not possible'
              }
            ></Orders>
            <Orders
              title={'Bouquet surprise'}
              description={
                'If you want the recipient not to know what he will be given and from whom, then indicate this in the order notes'
              }
            ></Orders>
          </div>
        </div>
        <img
          src="images/productPageImg/Ellipse2.png"
          alt=""
          className="absolute left-0 top-[-100px] object-cover opacity-50 max-lg:top-[0px]"
        />
        <img
          src="images/productPageImg/Ellipse1.png"
          alt=""
          className="absolute right-[-300px] top-[-50px] object-cover opacity-60 max-lg:top-[0px]"
        />
      </div>
    </main>
  )
}
