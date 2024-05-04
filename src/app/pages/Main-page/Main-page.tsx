import BaseButton from 'components/shared/BaseButton/BaseButton'
import TestIcon from 'components/shared/icons/TestIcon'

export const MainPage: React.FC = () => {
  const handleClick = (): void => {
    console.log('click')
  }

  return (
    <>
      <div>
        <BaseButton variant="primary" type="submit" onClick={handleClick}>
          Submit Primary
        </BaseButton>
        <BaseButton variant="secondary" type="button" onClick={handleClick}>
          Button Secondary
        </BaseButton>
        <BaseButton variant="primary" type="button" disabled onClick={handleClick}>
          <TestIcon />
        </BaseButton>
      </div>
      <h1>This is Main Page</h1>
    </>
  )
}
