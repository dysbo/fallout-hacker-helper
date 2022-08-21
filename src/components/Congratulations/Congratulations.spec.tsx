import { act, findByText, fireEvent, render } from '@testing-library/react'
import Congratulations from './Congratulations'
import { MemoryRouter, Route, Routes } from 'react-router'
import PuzzleProvider from '../PuzzleProvider/PuzzleProvider'

jest.mock('../PuzzleProvider/PuzzleProvider')

describe('Congratulations tests', () => {
  test('should navigate to / when no words are left', () => {
    const { container } = render(<Congratulations />, {
      wrapper: (props) => (
        <MemoryRouter initialEntries={['/congrats']}>
          <Routes>
            <Route path="/congrats" element={<PuzzleProvider>{props.children}</PuzzleProvider>} />
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      )
    })

    expect(container).toHaveTextContent('Home')
  })

  test('should display remaining word when single word is left', () => {
    const { container } = render(<Congratulations />, {
      wrapper: (props) => (
        <MemoryRouter initialEntries={['/congrats']}>
          <Routes>
            <Route
              path="/congrats"
              element={
                // @ts-ignore
                <PuzzleProvider availableWords={['PICKLE']}>{props.children}</PuzzleProvider>
              }
            />
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      )
    })

    expect(container).toHaveTextContent('Congratulations! PICKLE must be your word!')
  })

  test('should clear words and navigate to / when start again is clicked', async () => {
    const mockClearAvailableWords = jest.fn()
    const { container } = render(<Congratulations />, {
      wrapper: (props) => (
        <MemoryRouter initialEntries={['/congrats']}>
          <Routes>
            <Route
              path="/congrats"
              element={
                // @ts-ignore
                <PuzzleProvider availableWords={['PICKLE']} clearAvailableWords={mockClearAvailableWords}>
                  {props.children}
                </PuzzleProvider>
              }
            />
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      )
    })

    expect(container).toHaveTextContent('Congratulations! PICKLE must be your word!')

    await act(async () => {
      const btn = await findByText(container, 'Start Again')
      expect(btn).toHaveFocus()
      fireEvent.keyDown(btn, { code: 'Enter' })
    })

    expect(mockClearAvailableWords).toHaveBeenCalledTimes(1)
    expect(container).toHaveTextContent('Home')
  })
})
