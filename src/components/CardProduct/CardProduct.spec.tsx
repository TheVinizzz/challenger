import { render, screen } from '@testing-library/react'
import CardProduct from '.'

describe('CardProduct', () => {
  it('should render a card product', () => {
    render(<CardProduct name="Teste1" description="test description"/>)

    expect(screen.getByText(/Teste1/i)).toBeInTheDocument()
    expect(screen.getByText(/test description/i)).toBeInTheDocument()
  })
})
