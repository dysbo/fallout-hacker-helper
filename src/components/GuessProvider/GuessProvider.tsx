import { ReactNode, useState } from 'react'
import { guessContext } from '../../context'

export interface GuessProviderProps {
  children: ReactNode | Array<ReactNode>
}

const GuessProvider = ({ children }: GuessProviderProps) => {
  const [guess, setGuess] = useState<string>()
  const [matches, setMatches] = useState<number>()

  const clear = () => {
    setGuess(undefined)
    setMatches(undefined)
  }

  return (
    <guessContext.Provider
      value={{
        clear,
        guess,
        matches,
        setGuess,
        setMatches
      }}
    >
      {children}
    </guessContext.Provider>
  )
}

export default GuessProvider
