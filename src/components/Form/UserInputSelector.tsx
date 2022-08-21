import { createContext, FocusEvent, FormEvent, KeyboardEvent, ReactNode } from 'react'
import UserInput from './UserInput'

export interface UserInputOptionSelectorProps {
  children: ReactNode | Array<ReactNode>
}

export const UserInputSelectorContext = createContext<{
  onBlur?: (e: FocusEvent<HTMLButtonElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>, action: (e: FormEvent<HTMLButtonElement>) => void) => void
}>({})

const UserInputSelector = ({ children }: UserInputOptionSelectorProps) => {
  const onBlur = (e: FocusEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    if (!e.relatedTarget?.className.includes('user-input-option')) {
      e.currentTarget.focus()
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: (e: FormEvent<HTMLButtonElement>) => void): void => {
    let sibling
    switch (e.code) {
      case 'ArrowLeft':
        sibling = e.currentTarget.previousElementSibling
        break
      case 'ArrowRight':
        sibling = e.currentTarget.nextElementSibling
        break
      case 'Enter':
        action(e)
        return
      default:
        return
    }

    if (sibling) (sibling as HTMLButtonElement).focus()
  }

  return (
    <UserInputSelectorContext.Provider value={{ onBlur, onKeyDown }}>
      <UserInput>
        <div className="user-input-selector">{children}</div>
      </UserInput>
    </UserInputSelectorContext.Provider>
  )
}

export default UserInputSelector
