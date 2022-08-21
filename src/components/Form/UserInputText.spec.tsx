import { act, fireEvent, render } from '@testing-library/react'
import UserInputText from './UserInputText'

describe('UserInputText tests', () => {
  test('should not change focus', async () => {
    const { container } = render(<UserInputText onChange={jest.fn()} onKeyDown={jest.fn()} value={''} />)

    const input = container.querySelector('input')
    expect(input).toHaveFocus()

    await act(() => {
      fireEvent.blur(input as Element)
    })

    expect(input).toHaveFocus()
  })
})
