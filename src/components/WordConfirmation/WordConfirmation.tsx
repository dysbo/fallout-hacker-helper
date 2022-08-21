import { useNavigate } from 'react-router'
import { useContext, useEffect } from 'react'
import { puzzleContext } from '../../context'
import Text from '../Form/Text'
import UserInputOption from '../Form/UserInputOption'
import UserInputSelector from '../Form/UserInputSelector'
import WordList from '../WordList/WordList'

const WordConfirmation = () => {
  const navigate = useNavigate()
  const { availableWords, clearAvailableWords } = useContext(puzzleContext)

  useEffect(() => {
    if (!availableWords.length) {
      navigate('/')
    }
  })

  const confirm = () => {
    navigate('/guess')
  }

  const deny = () => {
    clearAvailableWords()
    navigate('/')
  }

  return (
    <>
      <Text text="You have entered:" />
      <WordList />
      <Text text="Is this correct?" />
      <UserInputSelector>
        <UserInputOption text="Yes" autoFocus={true} action={confirm} />
        <UserInputOption text="No" action={deny} />
      </UserInputSelector>
    </>
  )
}

export default WordConfirmation
