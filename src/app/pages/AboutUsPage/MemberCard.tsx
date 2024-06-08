import Link from 'components/Link'

interface MemberCardProps {
  name: string
  roles: string
  img: string
  about: string
  contributions: string[]
  link: string
}

export const MemberCard: React.FC<MemberCardProps> = ({
  name,
  roles,
  img,
  about,
  contributions,
  link,
}: MemberCardProps) => {
  return (
    <div className="my-blur relative z-20 mx-auto max-w-[1000px]">
      <h3 className="title text-[40px] leading-none text-primary">{name}</h3>
      <h3 className="basic-text ml-2 mt-1">{roles}</h3>
      <div className="mx-auto mt-5 flex gap-5 max-md:flex-col">
        <img className="mx-auto w-[255px] object-cover" src={img}></img>
        <div className="mx-auto flex flex-col gap-2 max-md:max-w-[500px]">
          <h5 className="list-title">about</h5>
          <p className="basic-text">{about}</p>
          <h5 className="list-title">contributions</h5>
          <ul className="list-disc">
            {contributions.map((contribution, i) => (
              <li key={i} className="ml-4 list-item">
                {contribution}
              </li>
            ))}
          </ul>
          <Link href={link}>GitHub Profile</Link>
        </div>
      </div>
    </div>
  )
}
