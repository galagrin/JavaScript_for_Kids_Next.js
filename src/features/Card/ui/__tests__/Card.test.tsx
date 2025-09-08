import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card } from '../Card'
import { CardData } from '../../model/types'

// Мокаем CSS модули
jest.mock('../Card.module.scss', () => ({
  scene: 'scene',
  rollOut: 'rollOut',
  card: 'card',
  isFlipped: 'isFlipped',
  cardFace: 'cardFace',
  cardFaceFront: 'cardFaceFront',
  cardFaceBack: 'cardFaceBack',
  codeBlock: 'codeBlock',
}))

describe('Card', () => {
  const mockCardData: CardData = {
    id: '1',
    name: 'testMethod',
    childExplanation: 'Это тестовый метод',
    childExample: 'console.log("Hello"); console.log("World");',
    description: 'Описание метода',
    syntax: 'testMethod()',
    adultExample: 'Расширенный пример',
  }

  const mockSetIsFlipped = jest.fn()

  const defaultProps = {
    data: mockCardData,
    isFlipped: false,
    setIsFlipped: mockSetIsFlipped,
    rolledOut: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Рендеринг', () => {
    it('рендерится с корректными данными', () => {
      render(<Card {...defaultProps} />)
      
      // Проверяем название метода на лицевой стороне
      expect(screen.getByText('testMethod ()')).toBeInTheDocument()
      
      // Проверяем объяснение на обратной стороне
      expect(screen.getByText('Это тестовый метод')).toBeInTheDocument()
    })

    it('корректно форматирует примеры кода', () => {
      render(<Card {...defaultProps} />)
      
      // Проверяем, что код разделен по строкам
      expect(screen.getByText('console.log("Hello")')).toBeInTheDocument()
      expect(screen.getByText('console.log("World")')).toBeInTheDocument()
    })

    it('применяет CSS класс rollOut когда rolledOut=true', () => {
      render(<Card {...defaultProps} rolledOut={true} />)
      
      const scene = screen.getByRole('button').parentElement
      expect(scene).toHaveClass('scene')
      expect(scene).toHaveClass('rollOut')
    })

    it('не применяет CSS класс rollOut когда rolledOut=false', () => {
      render(<Card {...defaultProps} rolledOut={false} />)
      
      const scene = screen.getByRole('button').parentElement
      expect(scene).toHaveClass('scene')
      expect(scene).not.toHaveClass('rollOut')
    })

    it('применяет CSS класс isFlipped когда isFlipped=true', () => {
      render(<Card {...defaultProps} isFlipped={true} />)
      
      const card = screen.getByRole('button')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('isFlipped')
    })

    it('не применяет CSS класс isFlipped когда isFlipped=false', () => {
      render(<Card {...defaultProps} isFlipped={false} />)
      
      const card = screen.getByRole('button')
      expect(card).toHaveClass('card')
      expect(card).not.toHaveClass('isFlipped')
    })
  })

  describe('Интерактивность', () => {
    it('вызывает setIsFlipped при клике', async () => {
      const user = userEvent.setup()
      render(<Card {...defaultProps} />)
      
      const card = screen.getByRole('button')
      await user.click(card)
      
      expect(mockSetIsFlipped).toHaveBeenCalledTimes(1)
      expect(mockSetIsFlipped).toHaveBeenCalledWith(true)
    })

    it('вызывает setIsFlipped при нажатии Enter', async () => {
      const user = userEvent.setup()
      render(<Card {...defaultProps} />)
      
      const card = screen.getByRole('button')
      card.focus()
      await user.keyboard('{Enter}')
      
      expect(mockSetIsFlipped).toHaveBeenCalledTimes(1)
      expect(mockSetIsFlipped).toHaveBeenCalledWith(true)
    })

    it('вызывает setIsFlipped при нажатии пробела', async () => {
      const user = userEvent.setup()
      render(<Card {...defaultProps} />)
      
      const card = screen.getByRole('button')
      card.focus()
      await user.keyboard(' ')
      
      expect(mockSetIsFlipped).toHaveBeenCalledTimes(1)
      expect(mockSetIsFlipped).toHaveBeenCalledWith(true)
    })

    it('не вызывает setIsFlipped при нажатии других клавиш', async () => {
      const user = userEvent.setup()
      render(<Card {...defaultProps} />)
      
      const card = screen.getByRole('button')
      card.focus()
      await user.keyboard('{Escape}')
      await user.keyboard('{Tab}')
      
      expect(mockSetIsFlipped).not.toHaveBeenCalled()
    })

    it('переключает состояние с false на true', async () => {
      const user = userEvent.setup()
      render(<Card {...defaultProps} isFlipped={false} />)
      
      const card = screen.getByRole('button')
      await user.click(card)
      
      expect(mockSetIsFlipped).toHaveBeenCalledWith(true)
    })

    it('переключает состояние с true на false', async () => {
      const user = userEvent.setup()
      render(<Card {...defaultProps} isFlipped={true} />)
      
      const card = screen.getByRole('button')
      await user.click(card)
      
      expect(mockSetIsFlipped).toHaveBeenCalledWith(false)
    })
  })

  describe('Доступность', () => {
    it('имеет корректный role="button"', () => {
      render(<Card {...defaultProps} />)
      
      const card = screen.getByRole('button')
      expect(card).toBeInTheDocument()
    })

    it('имеет tabIndex=0 для навигации с клавиатуры', () => {
      render(<Card {...defaultProps} />)
      
      const card = screen.getByRole('button')
      expect(card).toHaveAttribute('tabIndex', '0')
    })

    it('имеет корректный aria-label когда карточка не перевернута', () => {
      render(<Card {...defaultProps} isFlipped={false} />)
      
      const card = screen.getByRole('button')
      expect(card).toHaveAttribute('aria-label', 'Показать детали метода testMethod')
    })

    it('имеет корректный aria-label когда карточка перевернута', () => {
      render(<Card {...defaultProps} isFlipped={true} />)
      
      const card = screen.getByRole('button')
      expect(card).toHaveAttribute('aria-label', 'Скрыть детали метода testMethod')
    })
  })

  describe('Функция formatExample', () => {
    it('разделяет строки по точке с запятой', () => {
      const testData = {
        ...mockCardData,
        childExample: 'line1; line2; line3',
      }
      
      render(<Card {...defaultProps} data={testData} />)
      
      expect(screen.getByText('line1')).toBeInTheDocument()
      expect(screen.getByText('line2')).toBeInTheDocument()
      expect(screen.getByText('line3')).toBeInTheDocument()
    })

    it('обрабатывает строку без точек с запятой', () => {
      const testData = {
        ...mockCardData,
        childExample: 'single line',
      }
      
      render(<Card {...defaultProps} data={testData} />)
      
      expect(screen.getByText('single line')).toBeInTheDocument()
    })

    it('удаляет лишние пробелы из строк', () => {
      const testData = {
        ...mockCardData,
        childExample: '  line1  ;  line2  ;  line3  ',
      }
      
      render(<Card {...defaultProps} data={testData} />)
      
      expect(screen.getByText('line1')).toBeInTheDocument()
      expect(screen.getByText('line2')).toBeInTheDocument()
      expect(screen.getByText('line3')).toBeInTheDocument()
    })

    it('обрабатывает пустую строку', () => {
      const testData = {
        ...mockCardData,
        childExample: '',
      }
      
      render(<Card {...defaultProps} data={testData} />)
      
      // Компонент должен рендериться без ошибок
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Краевые случаи', () => {
    it('обрабатывает отсутствие childExplanation', () => {
      const testData = {
        ...mockCardData,
        childExplanation: '',
      }
      
      render(<Card {...defaultProps} data={testData} />)
      
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('обрабатывает длинные названия методов', () => {
      const testData = {
        ...mockCardData,
        name: 'veryLongMethodNameThatShouldStillWork',
      }
      
      render(<Card {...defaultProps} data={testData} />)
      
      expect(screen.getByText('veryLongMethodNameThatShouldStillWork ()')).toBeInTheDocument()
    })

    it('обрабатывает специальные символы в примерах', () => {
      const testData = {
        ...mockCardData,
        childExample: 'console.log("Hello & goodbye"); alert("test");',
      }
      
      render(<Card {...defaultProps} data={testData} />)
      
      expect(screen.getByText('console.log("Hello & goodbye")')).toBeInTheDocument()
      expect(screen.getByText('alert("test")')).toBeInTheDocument()
    })
  })

  describe('Интеграционные тесты', () => {
    it('полный сценарий взаимодействия пользователя', async () => {
      const user = userEvent.setup()
      
      render(<Card {...defaultProps} />)
      
      // Изначально карточка не перевернута
      const card = screen.getByRole('button')
      expect(card).toHaveAttribute('aria-label', 'Показать детали метода testMethod')
      expect(card).not.toHaveClass('isFlipped')
      
      // Переворачиваем карточку
      await user.click(card)
      expect(mockSetIsFlipped).toHaveBeenCalledWith(true)
    })

    it('корректно обновляет aria-label при изменении состояния isFlipped', () => {
      // Тестируем состояние не перевернутой карточки
      const { rerender } = render(<Card {...defaultProps} isFlipped={false} />)
      
      let card = screen.getByRole('button')
      expect(card).toHaveAttribute('aria-label', 'Показать детали метода testMethod')
      
      // Тестируем состояние перевернутой карточки
      rerender(<Card {...defaultProps} isFlipped={true} />)
      card = screen.getByRole('button')
      expect(card).toHaveAttribute('aria-label', 'Скрыть детали метода testMethod')
    })
  })
})