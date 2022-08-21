import { GuessContextAttributes, PuzzleContextAttributes } from '../../context'
import { MemoryRouter, Route, Routes } from 'react-router'
import PuzzleProvider from '../PuzzleProvider/PuzzleProvider'
import { ReactNode } from 'react'
import { act, findByText, fireEvent, render } from '@testing-library/react'
import Guess from './Guess'
import GuessProvider from '../GuessProvider/GuessProvider'

jest.mock('../PuzzleProvider/PuzzleProvider')
jest.mock('../GuessProvider/GuessProvider')

const createWrapper =
  (
    puzzleContextAttributes: Partial<PuzzleContextAttributes> = {},
    guessContextAttributes: Partial<GuessContextAttributes> = {}
  ) =>
  (props: { children: ReactNode }) =>
    (
      <MemoryRouter initialEntries={['/guess']}>
        <Routes>
          <Route
            path="/guess"
            element={
              <PuzzleProvider {...puzzleContextAttributes}>
                <GuessProvider {...guessContextAttributes}>{props.children}</GuessProvider>
              </PuzzleProvider>
            }
          />
          <Route path="/congratulations" element={<div>Congrats</div>} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    )

describe('Guess tests', () => {
  test('should show start over message when no words remain', async () => {
    const mockClearAvailableWords = jest.fn()

    const { container } = render(<Guess />, {
      wrapper: createWrapper({
        clearAvailableWords: mockClearAvailableWords
      })
    })

    expect(container).toHaveTextContent('It seems that there are no words remaining. Check your entries and try again.')

    await act(async () => {
      const btn = await findByText(container, 'Start Again')
      fireEvent.keyDown(btn, { code: 'Enter' })
    })

    expect(mockClearAvailableWords).toHaveBeenCalledTimes(1)
    expect(container).toHaveTextContent('Home')
  })

  test('should navigate to /congratulations if only one word remains', () => {
    const { container } = render(<Guess />, {
      wrapper: createWrapper({
        availableWords: ['PICKLE']
      })
    })

    expect(container).toHaveTextContent('Congrats')
  })

  test('should process guess when guess is complete', () => {
    const mockProcessGuess = jest.fn()
    const mockClear = jest.fn()
    render(<Guess />, {
      wrapper: createWrapper(
        {
          availableWords: ['PICKLE'],
          processGuess: mockProcessGuess
        },
        {
          guess: 'PICKLE',
          matches: 0,
          clear: mockClear
        }
      )
    })

    expect(mockProcessGuess).toHaveBeenCalledTimes(1)
    expect(mockClear).toHaveBeenCalledTimes(1)
  })
})
