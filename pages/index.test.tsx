import { render, screen } from '@testing-library/react'
import Home from './index.page'

describe('Home component', () => {
  it('should render the "Welcome to Pomodoro" message', () => {
    render(<Home />)
    const home = screen.getByText(/Welcome to Pomodoro/i)
    expect(home).toBeInTheDocument()
  })
})