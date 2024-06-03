export const ProductImages: React.FC = () => {
  return (
    <>
      <img
        className="  absolute left-0 top-0 w-96 object-cover opacity-50 max-md:w-64"
        src="/images/productPageImg/Ellipse lt.png"
        alt="Ellipse lt"
      />
      <img
        className="  absolute right-0 top-0  w-[500px] object-cover opacity-60 max-md:w-80"
        src="/images/productPageImg/Ellipse rt.png"
        alt="Ellipse rt"
      />
      <img
        className="absolute bottom-0 right-0  w-64 object-cover max-lg:hidden"
        src="/images/productPageImg/flower product page.png"
        alt="flower product page"
      />
    </>
  )
}
