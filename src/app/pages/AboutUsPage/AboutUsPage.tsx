import { AboutUsPageImages } from './AboutUsPageImages'
import { Members } from './MembersComponent'
import { Collaboration } from './Collaboration'
import { RssLink } from './RssLink'
export const AboutUsPage: React.FC = () => {
  return (
    <main className=" container mx-auto mt-36  px-2 max-md:mt-24">
      <h3 className="title relative z-20 mb-20 ml-20 max-md:mb-0">About Us</h3>
      <Members />
      <AboutUsPageImages />
      <div className="my-5 flex gap-5 max-md:flex-col">
        <Collaboration />
        <RssLink />
      </div>
    </main>
  )
}
