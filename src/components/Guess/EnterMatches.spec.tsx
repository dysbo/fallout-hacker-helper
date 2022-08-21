import { GuessContextAttributes, PuzzleContextAttributes } from '../../context'
import { ReactNode } from 'react'
import PuzzleProvider from '../PuzzleProvider/PuzzleProvider'
import GuessProvider from '../GuessProvider/GuessProvider'
import { act, findByText, fireEvent, render } from '@testing-library/react'
import EnterMatches from './EnterMatches'

jest.mock('../PuzzleProvider/PuzzleProvider')
jest.mock('../GuessProvider/GuessProvider')

const createWrapper =
  (
    puzzleContextAttributes: Partial<PuzzleContextAttributes> = {},
    guessContextAttributes: Partial<GuessContextAttributes> = {}
  ) =>
  (props: { children: ReactNode }) =>
    (
      <PuzzleProvider {...puzzleContextAttributes}>
        <GuessProvider {...guessContextAttributes}>{props.children}</GuessProvider>
      </PuzzleProvider>
    )

describe('EnterMatches tests', () => {
  test('should render null if guess is not set', () => {
    const { container } = render(<EnterMatches />, {
      wrapper: createWrapper()
    })

    expect(container).toBeEmptyDOMElement()
  })

  test('should set match when integer is selected', async () => {
    const mockSetMatches = jest.fn()
    const { container } = render(<EnterMatches />, {
      wrapper: createWrapper(
        {
          availableWords: ['DONKEY', 'PICKLE']
        },
        {
          guess: 'DONKEY',
          setMatches: mockSetMatches
        }
      )
    })

    await act(async () => {
      const btn = await findByText(container, '1')
      fireEvent.keyDown(btn, { code: 'Enter' })
    })

    expect(mockSetMatches).toHaveBeenCalledTimes(1)
  })

  test('should show error when non integer button is selected', async () => {
    const mockSetMatches = jest.fn()
    const { container } = render(<EnterMatches />, {
      wrapper: createWrapper(
        {
          availableWords: ['DONKEY', 'PICKLE']
        },
        {
          guess: 'DONKEY',
          setMatches: mockSetMatches
        }
      )
    })

    await act(() => {
      const btn = container.querySelectorAll('.user-input-option').item(5)
      btn.textContent = 'not a number'
      fireEvent.keyDown(btn, { code: 'Enter' })
    })

    expect(mockSetMatches).toHaveBeenCalledTimes(0)
    expect(container).toHaveTextContent(
      'Error! Failed to parse selected value to a number. Please check your settings and try again.'
    )
  })

  test('should show error when button with no text content is selected', async () => {
    const mockSetMatches = jest.fn()
    const { container } = render(<EnterMatches />, {
      wrapper: createWrapper(
        {
          availableWords: ['DONKEY', 'PICKLE']
        },
        {
          guess: 'DONKEY',
          setMatches: mockSetMatches
        }
      )
    })

    await act(() => {
      const btn = container.querySelectorAll('.user-input-option').item(5)
      btn.textContent = ''
      fireEvent.keyDown(btn, { code: 'Enter' })
    })

    expect(mockSetMatches).toHaveBeenCalledTimes(0)
    expect(container).toHaveTextContent('Error! No match count selected! Please check your input and try again.')
  })
})
