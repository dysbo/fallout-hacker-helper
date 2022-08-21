import Text from '../Form/Text'
import UserInputSelector from '../Form/UserInputSelector'
import { FormEvent, useContext, useState } from 'react'
import { guessContext } from '../../context'
import UserInputOption from '../Form/UserInputOption'
import { isInteger } from 'lodash'

const EnterMatches = () => {
  const [error, setError] = useState<string>()
  const { guess, setMatches } = useContext(guessContext)

  if (!guess) return null

  const verifyAndSetMatches = (e: FormEvent<HTMLButtonElement>) => {
    const button = e.currentTarget as HTMLButtonElement
    const text = button.textContent

    if (!text) {
      return setError('No match count selected!  Please check your input and try again.')
    }

    const num = parseInt(text)
    if (!isInteger(num)) {
      return setError('Failed to parse selected value to a number.  Please check your settings and try again.')
    }
    setMatches(num)
  }

  const options = []

  for (let i = 0; i <= guess.length; i++) {
    options.push(<UserInputOption autoFocus={i === 0} key={i} text={`${i}`} action={verifyAndSetMatches} />)
  }

  return (
    <>
      <Text text="How many matches?" />
      <UserInputSelector>{options}</UserInputSelector>
      {error && <Text text={`Error! ${error}`} />}
    </>
  )
}

export default EnterMatches
