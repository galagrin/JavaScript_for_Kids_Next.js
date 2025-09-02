import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'

// Кастомный провайдер для тестов
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}

// Кастомная функция render с провайдерами
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Утилиты для работы с Zustand stores в тестах
export const createMockStore = <T extends object>(initialState: T) => {
  let state = initialState
  
  return {
    getState: () => state,
    setState: (newState: Partial<T> | ((prevState: T) => T)) => {
      if (typeof newState === 'function') {
        state = newState(state)
      } else {
        state = { ...state, ...newState }
      }
    },
    subscribe: jest.fn(),
    destroy: jest.fn(),
  }
}

// Хелпер для мока fetch API
export const mockFetch = (response: any, status = 200) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
    })
  ) as jest.Mock
}

// Хелпер для очистки всех моков
export const clearAllMocks = () => {
  jest.clearAllMocks()
  // Очистка localStorage
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  })
}

// Хелпер для мока localStorage
export const mockLocalStorage = (initialData: Record<string, string> = {}) => {
  const store: Record<string, string> = { ...initialData }
  
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key]
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach(key => delete store[key])
      }),
    },
    writable: true,
  })
  
  return store
}

// Переэкспортируем все из testing-library
export * from '@testing-library/react'
export { customRender as render }