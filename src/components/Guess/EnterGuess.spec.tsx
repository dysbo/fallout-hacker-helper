import { GuessContextAttributes, PuzzleContextAttributes } from '../../context'
import { ReactNode } from 'react'
import PuzzleProvider from '../PuzzleProvider/PuzzleProvider'
import GuessProvider from '../GuessProvider/GuessProvider'
import { act, findByText, fireEvent, render } from '@testing-library/react'
import EnterGuess from './EnterGuess'

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

describe('EnterGuess tests', () => {
  test('should show list of guessed words for selection', () => {
    const { container } = render(<EnterGuess />, {
      wrapper: createWrapper({
        availableWords: ['PICKLE', 'STABBY']
      })
    })

    expect(container).toHaveTextContent('Which word did you guess?')
    expect(container).toHaveTextContent('PICKLE')
    expect(container).toHaveTextContent('STABBY')
  })

  test('should show error when selection error occurs', async () => {
    const { container } = render(<EnterGuess />, {
      wrapper: createWrapper({
        availableWords: ['PICKLE', '']
      })
    })

    await act(() => {
      const btn = container.querySelectorAll('.user-input-option').item(1)
      fireEvent.keyDown(btn, { code: 'Enter' })
    })

    expect(container).toHaveTextContent('Error! No word selected! Please check your input and try again.')
  })

  test('should set guess when selection is chosen', async () => {
    const mockSetGuess = jest.fn()
    const { container } = render(<EnterGuess />, {
      wrapper: createWrapper(
        {
          availableWords: ['PICKLE', 'STABBY']
        },
        {
          setGuess: mockSetGuess
        }
      )
    })

    await act(async () => {
      const btn = await findByText(container, 'PICKLE')
      fireEvent.keyDown(btn, { code: 'Enter' })
    })

    expect(mockSetGuess).toHaveBeenCalledTimes(1)
  })
})
