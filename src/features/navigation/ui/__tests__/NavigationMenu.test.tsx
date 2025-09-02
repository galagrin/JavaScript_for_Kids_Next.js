import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NavigationMenu } from '../NavigationMenu'

// Мокаем NavLink компонент
jest.mock('@/entities/navlink/ui/NavLink', () => {
  return function MockNavLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

describe('NavigationMenu', () => {
  beforeEach(() => {
    // Очищаем все моки перед каждым тестом
    jest.clearAllMocks()
  })

  it('рендерится без ошибок', () => {
    render(<NavigationMenu />)
    
    const burgerButton = screen.getByRole('button', { name: /открыть меню/i })
    expect(burgerButton).toBeInTheDocument()
  })

  it('открывает меню при клике на кнопку', async () => {
    const user = userEvent.setup()
    render(<NavigationMenu />)
    
    const burgerButton = screen.getByRole('button', { name: /открыть меню/i })
    await user.click(burgerButton)
    
    // Проверяем, что aria-label изменился
    expect(burgerButton).toHaveAttribute('aria-label', 'Закрыть меню')
  })

  it('закрывает меню при повторном клике на кнопку', async () => {
    const user = userEvent.setup()
    render(<NavigationMenu />)
    
    const burgerButton = screen.getByRole('button', { name: /открыть меню/i })
    
    // Открываем меню
    await user.click(burgerButton)
    expect(burgerButton).toHaveAttribute('aria-label', 'Закрыть меню')
    
    // Закрываем меню
    await user.click(burgerButton)
    expect(burgerButton).toHaveAttribute('aria-label', 'Открыть меню')
  })

  it('закрывает меню при нажатии Escape', async () => {
    const user = userEvent.setup()
    render(<NavigationMenu />)
    
    const burgerButton = screen.getByRole('button', { name: /открыть меню/i })
    
    // Открываем меню
    await user.click(burgerButton)
    expect(burgerButton).toHaveAttribute('aria-label', 'Закрыть меню')
    
    // Нажимаем Escape
    await user.keyboard('{Escape}')
    expect(burgerButton).toHaveAttribute('aria-label', 'Открыть меню')
  })

  it('закрывает меню при клике вне его области', async () => {
    render(
      <div>
        <NavigationMenu />
        <div data-testid="outside">Outside element</div>
      </div>
    )
    
    const burgerButton = screen.getByRole('button', { name: /открыть меню/i })
    const outsideElement = screen.getByTestId('outside')
    
    // Открываем меню
    await userEvent.click(burgerButton)
    expect(burgerButton).toHaveAttribute('aria-label', 'Закрыть меню')
    
    // Кликаем вне меню
    fireEvent.mouseDown(outsideElement)
    expect(burgerButton).toHaveAttribute('aria-label', 'Открыть меню')
  })

  it('не закрывает меню при клике внутри меню', async () => {
    render(<NavigationMenu />)
    
    const burgerButton = screen.getByRole('button', { name: /открыть меню/i })
    
    // Открываем меню
    await userEvent.click(burgerButton)
    expect(burgerButton).toHaveAttribute('aria-label', 'Закрыть меню')
    
    // Кликаем по самой кнопке (внутри меню)
    fireEvent.mouseDown(burgerButton)
    expect(burgerButton).toHaveAttribute('aria-label', 'Закрыть меню')
  })

  it('правильно очищает event listeners при размонтировании', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener')
    
    const { unmount } = render(<NavigationMenu />)
    
    // Размонтируем компонент
    unmount()
    
    // Проверяем, что event listeners были удалены
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    
    removeEventListenerSpy.mockRestore()
  })
})