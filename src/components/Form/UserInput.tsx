import { ReactNode } from 'react'

export interface UserInputProps {
  children: ReactNode
}

const UserInput = (props: UserInputProps) => (
  <div className="user-input">
    <div>&gt;&nbsp;</div>
    {props.children}
  </div>
)

export default UserInput
