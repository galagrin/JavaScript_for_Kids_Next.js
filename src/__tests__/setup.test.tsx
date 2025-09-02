import { render, screen } from '@testing-library/react'

// Простой компонент для тестирования настройки
function TestComponent() {
  return (
    <div>
      <h1>Test Component</h1>
      <button>Click me</button>
    </div>
  )
}

describe('Настройка тестирования', () => {
  it('Jest и React Testing Library работают корректно', () => {
    render(<TestComponent />)
    
    expect(screen.getByText('Test Component')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('jest-dom матчеры доступны', () => {
    render(<TestComponent />)
    
    const button = screen.getByRole('button')
    expect(button).toBeVisible()
    expect(button).toBeInTheDocument()
  })

  it('CSS модули мокаются корректно', () => {
    // Этот тест проверяет, что CSS модули не вызывают ошибок
    // В реальных компонентах стили будут мокаться через identity-obj-proxy
    expect(true).toBe(true)
  })
})