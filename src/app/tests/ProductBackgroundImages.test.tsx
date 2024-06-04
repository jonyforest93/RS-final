import { render } from '@testing-library/react'

import { ProductImages } from 'pages/ProductPage/ProductBackgroundImages'

describe('ProductImages Component', () => {
  test('renders product images correctly', () => {
    const { getByAltText } = render(<ProductImages />)

    const ellipseLtImg = getByAltText('Ellipse lt') as HTMLImageElement
    const ellipseRtImg = getByAltText('Ellipse rt') as HTMLImageElement
    const flowerImg = getByAltText('flower product page') as HTMLImageElement

    expect(ellipseLtImg).toBeTruthy()
    expect(ellipseRtImg).toBeTruthy()
    expect(flowerImg).toBeTruthy()
  })
})
