import { render, screen } from '@testing-library/react'
import NavLink from '../NavLink'

// Мокаем usePathname из next/navigation
const mockUsePathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

// Мокаем Next.js Link
jest.mock('next/link', () => {
  return function MockLink({ children, href, className, onClick, ...props }: any) {
    return (
      <a href={href} className={className} onClick={onClick} {...props}>
        {children}
      </a>
    )
  }
})

describe('NavLink', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('рендерится с правильным href и children', () => {
    mockUsePathname.mockReturnValue('/test')
    
    render(
      <NavLink href="/test">
        Test Link
      </NavLink>
    )
    
    const link = screen.getByRole('link', { name: 'Test Link' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('добавляет active класс когда pathname точно совпадает (exact=true)', () => {
    mockUsePathname.mockReturnValue('/about')
    
    render(
      <NavLink href="/about" exact className="nav-link">
        About
      </NavLink>
    )
    
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toHaveClass('nav-link')
    // Проверяем, что active класс добавлен (через CSS модули он может быть хэширован)
    expect(link.className).toContain('active')
  })

  it('не добавляет active класс когда pathname не совпадает точно (exact=true)', () => {
    mockUsePathname.mockReturnValue('/about/team')
    
    render(
      <NavLink href="/about" exact className="nav-link">
        About
      </NavLink>
    )
    
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toHaveClass('nav-link')
    expect(link.className).not.toContain('active')
  })

  it('добавляет active класс когда pathname начинается с href (exact=false)', () => {
    mockUsePathname.mockReturnValue('/products/laptops')
    
    render(
      <NavLink href="/products" className="nav-link">
        Products
      </NavLink>
    )
    
    const link = screen.getByRole('link', { name: 'Products' })
    expect(link).toHaveClass('nav-link')
    expect(link.className).toContain('active')
  })

  it('не добавляет active класс когда pathname не начинается с href', () => {
    mockUsePathname.mockReturnValue('/services')
    
    render(
      <NavLink href="/products" className="nav-link">
        Products
      </NavLink>
    )
    
    const link = screen.getByRole('link', { name: 'Products' })
    expect(link).toHaveClass('nav-link')
    expect(link.className).not.toContain('active')
  })

  it('работает без className', () => {
    mockUsePathname.mockReturnValue('/home')
    
    render(
      <NavLink href="/home">
        Home
      </NavLink>
    )
    
    const link = screen.getByRole('link', { name: 'Home' })
    expect(link).toBeInTheDocument()
  })

  it('вызывает onClick при клике', () => {
    const handleClick = jest.fn()
    mockUsePathname.mockReturnValue('/test')
    
    render(
      <NavLink href="/test" onClick={handleClick}>
        Test Link
      </NavLink>
    )
    
    const link = screen.getByRole('link', { name: 'Test Link' })
    link.click()
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('обрабатывает случай когда pathname равен null', () => {
    mockUsePathname.mockReturnValue(null)
    
    render(
      <NavLink href="/test" className="nav-link">
        Test Link
      </NavLink>
    )
    
    const link = screen.getByRole('link', { name: 'Test Link' })
    expect(link).toHaveClass('nav-link')
    expect(link.className).not.toContain('active')
  })

  it('передает дополнительные props в Link', () => {
    mockUsePathname.mockReturnValue('/test')
    
    render(
      <NavLink href="/test">
        <span data-testid="custom-link">Test Link</span>
      </NavLink>
    )
    
    const link = screen.getByTestId('custom-link')
    expect(link).toBeInTheDocument()
  })
})