import Text from '../Form/Text'
import UserInputSelector from '../Form/UserInputSelector'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { guessContext, puzzleContext } from '../../context'
import UserInputOption from '../Form/UserInputOption'

const EnterGuess = () => {
  const [error, setError] = useState<string>()
  const { availableWords } = useContext(puzzleContext)
  const { setGuess, setMatches } = useContext(guessContext)

  useEffect(() => {
    setMatches(undefined)
  }, [setMatches])

  const selectWord = (e: FormEvent<HTMLButtonElement>) => {
    const button = e.currentTarget as HTMLButtonElement
    const text = button.textContent

    if (!text) {
      return setError('No word selected!  Please check your input and try again.')
    }

    setGuess(text)
  }

  return (
    <>
      <Text text="Which word did you guess?" />
      <UserInputSelector>
        {availableWords.map((word: string, index: number) => (
          <UserInputOption autoFocus={index === 0} key={word} text={word} action={selectWord} />
        ))}
      </UserInputSelector>
      {error && <Text text={`Error! ${error}`} />}
    </>
  )
}

export default EnterGuess
