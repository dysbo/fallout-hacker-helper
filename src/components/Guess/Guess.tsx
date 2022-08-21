import { useNavigate } from 'react-router'
import { useCallback, useContext, useEffect } from 'react'
import { guessContext, puzzleContext } from '../../context'
import Text from '../Form/Text'
import WordList from '../WordList/WordList'
import EnterGuess from './EnterGuess'
import EnterMatches from './EnterMatches'
import UserInputSelector from '../Form/UserInputSelector'
import UserInputOption from '../Form/UserInputOption'

const Guess = () => {
  const navigate = useNavigate()
  const { availableWords, clearAvailableWords, processGuess } = useContext(puzzleContext)
  const { clear, guess, matches } = useContext(guessContext)

  useEffect(() => {
    if (availableWords.length === 1) {
      return navigate('/congratulations')
    }
  }, [availableWords.length, navigate])

  const handleGuessComplete = useCallback(
    (guess: string, matches: number) => {
      clear()
      processGuess({ word: guess, matches })
    },
    [clear, processGuess]
  )

  useEffect(() => {
    if (guess && matches !== undefined) {
      handleGuessComplete(guess, matches)
    }
  }, [guess, handleGuessComplete, matches, processGuess])

  const startAgain = () => {
    clearAvailableWords()
    navigate('/')
  }

  if (availableWords.length === 0)
    return (
      <>
        <Text text="It seems that there are no words remaining.  Check your entries and try again." />
        <UserInputSelector>
          <UserInputOption autoFocus text="Start Again" action={startAgain} />
        </UserInputSelector>
      </>
    )

  return (
    <>
      <Text text="Available words:" />
      <WordList />
      {!guess && <EnterGuess />}
      {guess && <EnterMatches />}
    </>
  )
}

export default Guess
