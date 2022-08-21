import { useContext, useEffect, useState } from 'react'
import { puzzleContext, PuzzleContextAttributes } from '../../context'
import { act, render } from '@testing-library/react'
import PuzzleProvider from './PuzzleProvider'

describe('PuzzleProvider tests', () => {
  test('should capitalize words when they are submitted', () => {
    const Tested = () => {
      const { availableWords, setAvailableWords } = useContext(puzzleContext)

      useEffect(() => {
        setAvailableWords(['pickle'])
      }, [])

      return <div>Words: {availableWords.join(', ')}</div>
    }

    const { container } = render(
      <PuzzleProvider>
        <Tested />
      </PuzzleProvider>
    )

    expect(container).toHaveTextContent('PICKLE')
  })

  test('should throw error when word lengths do not match', () => {
    const Tested = () => {
      const { availableWords, setAvailableWords } = useContext<PuzzleContextAttributes>(puzzleContext)
      const [error, setError] = useState<string>()

      useEffect(() => {
        try {
          setAvailableWords(['pickle', 'stabber'])
        } catch (e) {
          setError((e as Error).message)
        }
      }, [])

      return (
        <>
          <div>Words: {availableWords.join(', ')}</div>
          {error && <div>Error! {error}</div>}
        </>
      )
    }

    const { container } = render(
      <PuzzleProvider>
        <Tested />
      </PuzzleProvider>
    )

    expect(container).toHaveTextContent('Error! Words must be of the same length! Check your list and try again.')
  })

  test('should clear word list when clearAvailableWords is called', async () => {
    const Tested = () => {
      const { availableWords, clearAvailableWords, setAvailableWords } = useContext(puzzleContext)

      useEffect(() => {
        setAvailableWords(['pickle', 'stabby'])
      }, [])

      return (
        <>
          <div>Words: {availableWords.length ? availableWords.join(', ') : 'No Words'}</div>
          <button onClick={clearAvailableWords}>Clear Words</button>
        </>
      )
    }

    const { container } = render(
      <PuzzleProvider>
        <Tested />
      </PuzzleProvider>
    )

    expect(container).toHaveTextContent('PICKLE, STABBY')

    await act(async () => {
      const btn = container.querySelector('button')
      await btn?.click()
    })

    expect(container).toHaveTextContent('No Words')
  })

  test('should process guess when requested', async () => {
    const Tested = () => {
      const { availableWords, processGuess, setAvailableWords } = useContext(puzzleContext)

      useEffect(() => {
        setAvailableWords(['pickle'])
      }, [])

      return (
        <div>
          Words: {availableWords.length ? availableWords.join(', ') : 'No Words'}
          <br />
          <button
            onClick={() => {
              processGuess({ word: 'PICKLE', matches: 0 })
            }}
          >
            process
          </button>
        </div>
      )
    }

    const { container } = render(
      <PuzzleProvider>
        <Tested />
      </PuzzleProvider>
    )

    await act(async () => {
      const btn = container.querySelector('button')
      await btn?.click()
    })

    expect(container).toHaveTextContent('No Words')
  })
})
