import { guessContext, GuessContextAttributes } from '../../../context'
import { GuessProviderProps } from '../GuessProvider'

const GuessProvider = ({ children, ...guessContextAttributes }: GuessProviderProps & GuessContextAttributes) => {
  const value: GuessContextAttributes = {
    guess: guessContextAttributes.guess,
    setGuess: guessContextAttributes.setGuess || jest.fn(),
    matches: guessContextAttributes.matches,
    setMatches: guessContextAttributes.setMatches || jest.fn(),
    clear: guessContextAttributes.clear || jest.fn()
  }
  return <guessContext.Provider value={value}>{children}</guessContext.Provider>
}

export default GuessProvider
