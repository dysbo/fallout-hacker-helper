import { ReactNode, useState } from 'react'
import { puzzleContext } from '../../context'
import { IPuzzleGuess } from '../../puzzle/PuzzleGuess'
import Puzzle from '../../puzzle/Puzzle'

export interface PuzzleProviderProps {
  children: ReactNode | Array<ReactNode>
}

const PuzzleProvider = ({ children }: PuzzleProviderProps) => {
  const [availableWords, setAvailableWords] = useState<Array<string>>([])

  const capitalizeAndSetAvailableWords = (newAvailableWords: Array<string>) => {
    if (!newAvailableWords.every((word: string) => word.length === newAvailableWords[0].length)) {
      throw Error('Words must be of the same length!  Check your list and try again.')
    }

    setAvailableWords(Puzzle.convertListToUppercase(newAvailableWords))
  }

  const clearAvailableWords = (): void => setAvailableWords([])

  const processGuess = (guess: IPuzzleGuess): void => {
    setAvailableWords(Puzzle.filterWords(availableWords, guess))
  }

  return (
    <puzzleContext.Provider
      value={{
        availableWords,
        clearAvailableWords,
        processGuess,
        setAvailableWords: capitalizeAndSetAvailableWords
      }}
    >
      {children}
    </puzzleContext.Provider>
  )
}

export default PuzzleProvider
