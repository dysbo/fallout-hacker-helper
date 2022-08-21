import { useContext, useEffect } from 'react'
import { guessContext, GuessContextAttributes } from '../../context'
import { act, findByText, render } from '@testing-library/react'
import GuessProvider from './GuessProvider'

describe('GuessProvider tests', () => {
  test('should clear guess when requested', async () => {
    const Tested = () => {
      const { guess, matches, setGuess, setMatches, clear } = useContext<GuessContextAttributes>(guessContext)
      useEffect(() => {
        setGuess('GUESS')
        setMatches(0)
      }, [setGuess, setMatches])

      return (
        <div>
          Guess: {guess || 'No Guess'}
          <br />
          Matches: {matches !== undefined ? matches : 'No Matches'}
          <br />
          <button onClick={clear}>Clear Guess Data</button>
        </div>
      )
    }

    const { container } = render(
      <GuessProvider>
        <Tested />
      </GuessProvider>
    )

    expect(container).toHaveTextContent('Guess: GUESS')
    expect(container).toHaveTextContent('Matches: 0')

    await act(async () => {
      const btn = await findByText(container, 'Clear Guess Data')
      btn.click()
    })

    expect(container).toHaveTextContent('Guess: No Guess')
    expect(container).toHaveTextContent('Matches: No Matches')
  })
})
