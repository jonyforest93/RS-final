import { render, screen } from '@testing-library/react'

import Orders from 'pages/ProductPage/Orders'

import type { OrdersProps } from 'pages/ProductPage/Orders'

describe('Orders component', () => {
  test('renders title and description correctly', () => {
    const props: OrdersProps = {
      title: 'Test Title',
      description: 'Test Description',
    }

    render(<Orders {...props} />)

    const titleElement = screen.getByText(props.title)
    const descriptionElement = screen.getByText(props.description)

    expect(titleElement).toBeTruthy()
    expect(descriptionElement).toBeTruthy()
  })
})
