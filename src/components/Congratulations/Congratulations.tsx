import { useContext, useEffect } from 'react'
import { puzzleContext } from '../../context'
import Text from '../Form/Text'
import { useNavigate } from 'react-router'
import WordList from '../WordList/WordList'
import UserInputSelector from '../Form/UserInputSelector'
import UserInputOption from '../Form/UserInputOption'

const Congratulations = () => {
  const { availableWords, clearAvailableWords } = useContext(puzzleContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (availableWords.length !== 1) {
      navigate('/')
    }
  }, [availableWords.length, navigate])

  const startAgain = () => {
    clearAvailableWords()
    navigate('/')
  }

  return (
    <>
      <WordList />
      <Text text={`Congratulations! ${availableWords[0]} must be your word!`} />
      <UserInputSelector>
        <UserInputOption autoFocus text="Start Again" action={startAgain} />
      </UserInputSelector>
    </>
  )
}

export default Congratulations
