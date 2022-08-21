import { act, fireEvent, render } from '@testing-library/react'
import WordEntry from './WordEntry'
import PuzzleProvider from '../PuzzleProvider/PuzzleProvider'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

jest.mock('../PuzzleProvider/PuzzleProvider')

describe('WordEntry tests', () => {
  test('should initially appear with no entered words and instructions on entering them', () => {
    const { container } = render(<WordEntry />, {
      wrapper: (props) => (
        <MemoryRouter>
          <PuzzleProvider>{props.children}</PuzzleProvider>
        </MemoryRouter>
      )
    })

    expect(container).toHaveTextContent('Be sure to remove as many duds as possible before you begin.')
    expect(container).toHaveTextContent(
      'Enter the words available in a single line, separated by a space. When finished, press ENTER to submit them.'
    )
  })

  test('should go to /confirm if words are present', () => {
    const { container } = render(<WordEntry />, {
      wrapper: (props) => (
        <MemoryRouter>
          <Routes>
            <Route
              path="/"
              element={
                // @ts-ignore
                <PuzzleProvider availableWords={['PICKLE']}>{props.children}</PuzzleProvider>
              }
            />
            <Route path="/confirm" element={<div>Confirming</div>} />
          </Routes>
        </MemoryRouter>
      )
    })

    expect(container).toHaveTextContent('Confirming')
  })

  test('should not fire available word change when key pressed is not enter', async () => {
    const mockSetAvailableWords = jest.fn()

    const { container } = render(<WordEntry />, {
      wrapper: (props) => (
        <MemoryRouter>
          {/* @ts-ignore */}
          <PuzzleProvider setAvailableWords={mockSetAvailableWords}>{props.children}</PuzzleProvider>
        </MemoryRouter>
      )
    })

    await act(async () => {
      const input = container.querySelector('input.user-input-text')
      // @ts-ignore
      fireEvent.keyDown(input, { code: 'A' })
    })

    expect(mockSetAvailableWords).toHaveBeenCalledTimes(0)
  })

  test('should show error when error occurs', async () => {
    const mockSetAvailableWords = jest.fn().mockImplementation(() => {
      throw Error('broken')
    })

    const { container } = render(<WordEntry />, {
      wrapper: (props) => (
        <MemoryRouter>
          {/* @ts-ignore */}
          <PuzzleProvider setAvailableWords={mockSetAvailableWords}>{props.children}</PuzzleProvider>
        </MemoryRouter>
      )
    })

    await act(async () => {
      const input = container.querySelector('input.user-input-text')
      // @ts-ignore
      fireEvent.change(input, { target: { value: 'sing wing ding' } })
      // @ts-ignore
      fireEvent.keyDown(input, { code: 'Enter' })
    })

    expect(mockSetAvailableWords).toHaveBeenCalledTimes(1)
    expect(container).toHaveTextContent('Error! broken')
  })

  test('should go to /confirm when words are entered successfully', async () => {
    const { container } = render(<WordEntry />, {
      wrapper: (props) => (
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<PuzzleProvider>{props.children}</PuzzleProvider>} />
            <Route path="/confirm" element={<div>Confirming</div>} />
          </Routes>
        </MemoryRouter>
      )
    })

    await act(async () => {
      const input = container.querySelector('input.user-input-text')
      // @ts-ignore
      fireEvent.change(input, { target: { value: 'PICKLE ' } })
      // @ts-ignore
      fireEvent.keyDown(input, { code: 'Enter' })
    })

    expect(container).toHaveTextContent('Confirming')
  })
})
