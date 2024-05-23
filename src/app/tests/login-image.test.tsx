import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { LoginImages } from 'pages/Login-page/login-Images'

/**
 * @jest-environment jsdom
 */

describe('Registration-images', () => {
  it('should render images', () => {
    render(<LoginImages />)

    const loginFlower1 = screen.getByTestId('loginFlower1')
    const loginFlower2 = screen.getByTestId('loginFlower2')
    const loginEllipseRt = screen.getByTestId('loginEllipseRt')
    const loginEllipseRb = screen.getByTestId('loginEllipseRb')
    const loginEllipseLb = screen.getByTestId('loginEllipseLb')
    const loginEllipseLt = screen.getByTestId('loginEllipseLt')
    const loginSignature = screen.getByTestId('loginSignature')
    expect(loginFlower1).toBeInTheDocument()
    expect(loginFlower2).toBeInTheDocument()
    expect(loginEllipseRt).toBeInTheDocument()
    expect(loginEllipseRb).toBeInTheDocument()
    expect(loginEllipseLb).toBeInTheDocument()
    expect(loginEllipseLt).toBeInTheDocument()
    expect(loginSignature).toBeInTheDocument()
  })

  it('should match snapshoot', () => {
    const { container } = render(<LoginImages />)
    expect(container).toMatchSnapshot()
  })
})
