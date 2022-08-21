import { ChangeEvent, FocusEvent, KeyboardEvent, InputHTMLAttributes } from 'react'
import UserInput from './UserInput'

export interface UserInputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  keepFocus?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  value: string
}

const UserInputText = ({ keepFocus = true, ...inputProps }: UserInputTextProps) => {
  const maintainFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (keepFocus) e.target.focus()
  }

  return (
    <UserInput>
      <input type="text" autoFocus={true} onBlur={maintainFocus} className="user-input-text" {...inputProps} />
    </UserInput>
  )
}

export default UserInputText
