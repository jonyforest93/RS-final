import { Members } from './MembersComponent'

export const AboutUsPage: React.FC = () => {
  return (
    <main className=" container mx-auto mt-36 px-2 max-md:mt-24">
      <h3 className="title mb-20 ml-20 max-md:mb-0">About Us</h3>
      <Members />
      {/* <img
        className="absolute right-0 top-0 z-10 w-[30%] object-cover"
        src="/images/aboutUsImg/flower 1.png"
        alt="loginPage-flower"
        data-testid="loginFlower1"
      /> */}
    </main>
  )
}
