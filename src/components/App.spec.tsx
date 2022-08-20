import App from './App'
import { render } from '@testing-library/react'

describe('App test', () => {
  test('should render the app', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })
})
