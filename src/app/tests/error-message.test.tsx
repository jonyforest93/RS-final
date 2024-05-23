import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { ErrorModal } from 'pages/Login-page/Error-message-server-modal'

describe('ErrorModal component', () => {
  it('should display error message and handle button click', () => {
    const errorMessage = 'Test error message'
    const setDisplay = jest.fn()

    const { getByText } = render(<ErrorModal errorMessage={errorMessage} isDisplayed={true} setDisplay={setDisplay} />)

    expect(getByText(errorMessage)).toBeTruthy()

    fireEvent.click(getByText('Ok'))

    expect(setDisplay).toHaveBeenCalledWith(false)
  })
})
