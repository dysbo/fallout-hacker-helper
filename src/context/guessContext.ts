import { createContext } from 'react'
import { dummyFunction } from '../util'

export interface GuessContextAttributes {
  guess?: string
  setGuess: (guess?: string) => void
  matches?: number
  setMatches: (matches?: number) => void
  clear: () => void
}

export const guessContext = createContext<GuessContextAttributes>({
  setGuess: dummyFunction,
  setMatches: dummyFunction,
  clear: dummyFunction
})
