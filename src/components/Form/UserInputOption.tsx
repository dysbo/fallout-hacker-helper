import { FormEvent, useContext } from 'react'
import { UserInputSelectorContext } from './UserInputSelector'

export interface UserInputOptionProps {
  text: string
  action: (e: FormEvent<HTMLButtonElement>) => void
  autoFocus?: boolean
}

const UserInputOption = ({ action, text, autoFocus = false }: UserInputOptionProps) => {
  const { onBlur, onKeyDown } = useContext(UserInputSelectorContext)
  return (
    <button
      className="user-input-option"
      autoFocus={autoFocus}
      onBlur={onBlur}
      onMouseDownCapture={action}
      onKeyDown={(e) => onKeyDown && onKeyDown(e, action)}
    >
      {text}
    </button>
  )
}

export default UserInputOption
