import { render } from '@testing-library/react'
import WordList from './WordList'
import PuzzleProvider, { PuzzleProviderProps } from '../PuzzleProvider/PuzzleProvider'

jest.mock('../PuzzleProvider/PuzzleProvider')

const setUpWrapper = (extraProps: { availableWords: Array<string> }) => (props: PuzzleProviderProps) =>
  (
    <PuzzleProvider {...props} {...extraProps}>
      {props.children}
    </PuzzleProvider>
  )

describe('WordList tests', () => {
  test('should display words from context', () => {
    const { container } = render(<WordList />, {
      wrapper: setUpWrapper({ availableWords: ['PICKLE'] })
    })
    expect(container).toHaveTextContent('PICKLE')
  })
})
