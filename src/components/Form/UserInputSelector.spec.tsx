import { act, findByText, fireEvent, render } from '@testing-library/react'
import UserInputSelector from './UserInputSelector'
import UserInputOption from './UserInputOption'

describe('UserInputSelector tests', () => {
  test('should navigate to next element when ArrowRight is pressed', async () => {
    const { container } = render(
      <UserInputSelector>
        <UserInputOption text="first" action={jest.fn()} autoFocus />
        <UserInputOption text="second" action={jest.fn()} />
      </UserInputSelector>
    )

    await act(async () => {
      const btn = await findByText(container, 'first')
      fireEvent.keyDown(btn, { code: 'ArrowRight' })
    })

    await expect(findByText(container, 'second')).resolves.toHaveFocus()
  })

  test('should navigate to previous element when ArrowLeft is pressed', async () => {
    const { container } = render(
      <UserInputSelector>
        <UserInputOption text="first" action={jest.fn()} />
        <UserInputOption text="second" action={jest.fn()} autoFocus />
      </UserInputSelector>
    )

    await act(async () => {
      const btn = await findByText(container, 'second')
      fireEvent.keyDown(btn, { code: 'ArrowLeft' })
    })

    await expect(findByText(container, 'first')).resolves.toHaveFocus()
  })

  test('should not change focus when key pressed is not ArrowLeft or ArrowRight', async () => {
    const { container } = render(
      <UserInputSelector>
        <UserInputOption text="first" action={jest.fn()} />
        <UserInputOption text="second" action={jest.fn()} autoFocus />
      </UserInputSelector>
    )

    await act(async () => {
      const btn = await findByText(container, 'second')
      expect(btn).toHaveFocus()
      fireEvent.keyDown(btn, { code: 'ArrowUp' })
    })

    await expect(findByText(container, 'second')).resolves.toHaveFocus()
  })

  test('should not change focus when non-option element is selected', async () => {
    const { container } = render(
      <UserInputSelector>
        <UserInputOption text="first" action={jest.fn()} autoFocus />
        <UserInputOption text="second" action={jest.fn()} />
      </UserInputSelector>
    )

    const focused = await findByText(container, 'first')
    expect(focused).toHaveFocus()

    await act(async () => {
      fireEvent.blur(focused, { relatedTarget: undefined })
    })

    expect(focused).toHaveFocus()
  })
})
