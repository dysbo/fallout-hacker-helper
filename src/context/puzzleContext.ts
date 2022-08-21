import { createContext } from 'react'
import { IPuzzleGuess } from '../puzzle/PuzzleGuess'
import { dummyFunction } from '../util'

export interface PuzzleContextAttributes {
  availableWords: Array<string>
  clearAvailableWords: () => void
  processGuess: (guess: IPuzzleGuess) => void
  setAvailableWords: (availableWords: Array<string>) => void
}

export const puzzleContext = createContext<PuzzleContextAttributes>({
  availableWords: [],
  clearAvailableWords: dummyFunction,
  processGuess: dummyFunction,
  setAvailableWords: dummyFunction
})
