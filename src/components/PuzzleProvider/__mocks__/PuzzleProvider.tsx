import { PuzzleProviderProps } from '../PuzzleProvider'
import { puzzleContext, PuzzleContextAttributes } from '../../../context'

const MockProvider = ({
  children,
  availableWords = [],
  setAvailableWords = jest.fn(),
  clearAvailableWords = jest.fn(),
  processGuess = jest.fn()
}: PuzzleProviderProps & PuzzleContextAttributes) => (
  <puzzleContext.Provider
    value={{
      availableWords,
      clearAvailableWords: clearAvailableWords,
      processGuess: processGuess,
      setAvailableWords: setAvailableWords
    }}
  >
    {children}
  </puzzleContext.Provider>
)

export default MockProvider
