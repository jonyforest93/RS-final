import { MemberCard } from './MemberCard'

export const Members: React.FC = () => {
  return (
    <div className="relative z-20 flex flex-col gap-5 ">
      <MemberCard
        name={'Yauheni Struneuski'}
        roles={'Team Lead, Front-End Developer'}
        img={'/images/aboutUsImg/evgen.png'}
        about={
          'Let me introduce myself. My name is Mariya I am a 20-year-old student from Donetsk. I study at the university in my native town and my future profession is bookkeeping. I live with my parents and my elder sister Lena. We are a friendly family. Lena is 2 years older than me. We share our room and tell all our secrets to each other.'
        }
        contributions={['Development Environment Configuration', 'Created Catalog page', 'Created Main page']}
        link={'https://github.com/jonyforest93'}
      ></MemberCard>
      <MemberCard
        name={'Aleksey Shuklin'}
        roles={'Front-End Developer'}
        img={'/images/aboutUsImg/aleksey.jpg'}
        about={
          'Former financier with 10 years of experience. I decided to start learning frontend. I am happy to learn new things and take on challenging tasks. I plan to study Angular and work at Google in the future.'
        }
        contributions={[
          'Implemented Routing',
          'Created Registration Page',
          'Created User Profile Page',
          'Created Basket Page',
          'configured work with SDK commercetools',
        ]}
        link={'https://github.com/visheyt'}
      ></MemberCard>
      <MemberCard
        name={'Valeriy Lastovka'}
        roles={'Front-End Developer'}
        img={'/images/aboutUsImg/valeriy.jpg'}
        about={
          'Hi, I’m 29 years old, some time ago I started doing front-end development, my goal is further development in this direction and learning new technologies'
        }
        contributions={['Created Product Page', 'Created Login Page', 'Created About Us Page']}
        link={'https://github.com/ValeriyL01'}
      ></MemberCard>
    </div>
  )
}
