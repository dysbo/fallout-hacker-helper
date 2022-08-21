import { MemoryRouter, Route, Routes } from 'react-router'
import PuzzleProvider from '../PuzzleProvider/PuzzleProvider'
import { ReactNode } from 'react'
import { PuzzleContextAttributes } from '../../context'
import { act, findByText, fireEvent, render } from '@testing-library/react'
import WordConfirmation from './WordConfirmation'

jest.mock('../PuzzleProvider/PuzzleProvider')

const createWrapper =
  (puzzleContextAttributes: Partial<PuzzleContextAttributes> = {}) =>
  (props: { children: ReactNode }) =>
    (
      <MemoryRouter initialEntries={['/confirm']}>
        <Routes>
          <Route
            path="/confirm"
            element={
              <PuzzleProvider
                // @ts-ignore
                availableWords={puzzleContextAttributes.availableWords}
                clearAvailableWords={puzzleContextAttributes.clearAvailableWords}
              >
                {props.children}
              </PuzzleProvider>
            }
          />
          <Route path="/" element={<div>Home</div>} />
          <Route path="/guess" element={<div>Guessing</div>} />
        </Routes>
      </MemoryRouter>
    )

describe('WordConfirmation tests', () => {
  test('should return to / if no words are available', () => {
    const { container } = render(<WordConfirmation />, { wrapper: createWrapper() })
    expect(container).toHaveTextContent('Home')
  })

  test('should go to /guess if word list is correct', async () => {
    const { container } = render(<WordConfirmation />, {
      wrapper: createWrapper({ availableWords: ['PICKLE'] })
    })

    expect(container).toHaveTextContent('PICKLE')

    await act(async () => {
      const btnYes = await findByText(container, 'Yes')
      expect(btnYes).toHaveFocus()
      fireEvent.keyDown(btnYes, { code: 'Enter' })
    })

    expect(container).toHaveTextContent('Guessing')
  })

  test('should return to / if word list is incorrect', async () => {
    const mockClearAvailableWords = jest.fn()
    const { container } = render(<WordConfirmation />, {
      wrapper: createWrapper({
        availableWords: ['PICKLE'],
        clearAvailableWords: mockClearAvailableWords
      })
    })

    expect(container).toHaveTextContent('PICKLE')

    await act(async () => {
      const btnYes = await findByText(container, 'Yes')
      expect(btnYes).toHaveFocus()
      fireEvent.keyDown(btnYes, { code: 'ArrowRight' })
      const btnNo = await findByText(container, 'No')
      expect(btnNo).toHaveFocus()
      fireEvent.keyDown(btnNo, { code: 'Enter' })
    })

    expect(mockClearAvailableWords).toHaveBeenCalledTimes(1)
    expect(container).toHaveTextContent('Home')
  })
})
