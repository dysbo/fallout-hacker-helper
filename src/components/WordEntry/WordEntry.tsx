import Text from '../Form/Text'
import UserInputText from '../Form/UserInputText'
import { useNavigate } from 'react-router'
import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from 'react'
import { puzzleContext } from '../../context'

const WordEntry = () => {
  const navigate = useNavigate()
  const { availableWords, setAvailableWords } = useContext(puzzleContext)
  const [error, setError] = useState<string>()
  const [input, setInput] = useState<string>('')

  useEffect(() => {
    if (availableWords.length) {
      navigate('/confirm')
    }
  }, [availableWords.length, navigate])

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.code !== 'Enter') return

    try {
      setAvailableWords(
        input
          .trim()
          .split(' ')
          .filter((x) => x)
      )
      navigate('/confirm')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <>
      <Text text="Be sure to remove as many duds as possible before you begin." />
      <Text text="Enter the words available in a single line, separated by a space.  When finished, press ENTER to submit them." />
      <UserInputText value={input} onChange={onChange} onKeyDown={onKeyDown} />
      {error && <Text text={`Error!  ${error}`} />}
    </>
  )
}

export default WordEntry
