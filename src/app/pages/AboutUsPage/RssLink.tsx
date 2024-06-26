import Link from 'components/Link'
import { RssIcon } from 'components/shared/icons/RssIcon'

export const RssLink: React.FC = () => {
  return (
    <div className="my-blur flex flex-col items-center  gap-5">
      <Link href={'https://rs.school/'}>
        <RssIcon></RssIcon>
      </Link>
      <h3 className="basic-text text-center">
        The project was made as part of the final assignment of the course from RS School
      </h3>
    </div>
  )
}
