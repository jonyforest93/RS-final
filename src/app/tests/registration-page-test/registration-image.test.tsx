import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { RegistrationImages } from '../../pages/Registration-page/Registration-images'

/**
 * @jest-environment jsdom
 */

describe('Registration-images', () => {
  it('should render images', () => {
    render(<RegistrationImages />)

    const flowerLeft = screen.getByTestId('flowerLeft')
    const flowerRight = screen.getByTestId('flowerRight')
    const flowerEllipseLeftTop = screen.getByTestId('flowerEllipseLeftTop')
    const flowerEllipseRightTop = screen.getByTestId('flowerEllipseRightTop')

    expect(flowerLeft).toBeInTheDocument()
    expect(flowerRight).toBeInTheDocument()
    expect(flowerEllipseLeftTop).toBeInTheDocument()
    expect(flowerEllipseRightTop).toBeInTheDocument()
  })

  it('should match snapshoot', () => {
    const { container } = render(<RegistrationImages />)
    expect(container).toMatchSnapshot()
  })
})
