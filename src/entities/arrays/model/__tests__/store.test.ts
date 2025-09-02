import { renderHook, act } from '@testing-library/react'
import { fetchArrays } from '@/shared/api/apiBase'

// Создаем простой мок store без persist middleware для тестирования
import { create } from 'zustand'
import { ArraysActions, ArraysState } from '../types'

// Мокаем API
jest.mock('@/shared/api/apiBase', () => ({
  fetchArrays: jest.fn(),
}))

const mockFetchArrays = fetchArrays as jest.MockedFunction<typeof fetchArrays>

// Создаем тестовый store без persist для изоляции тестов
const createTestStore = () => {
  return create<ArraysState & ArraysActions>((set, get) => ({
    arraysList: [],
    loadingAllArrays: false,
    errorAllArrays: null,
    lastFetchTime: 0,
    cacheExpiry: 5 * 60 * 1000,

    fetchAllArraysList: async (force = false) => {
      const state = get()
      const now = Date.now()
      
      if (!force && 
          state.arraysList.length > 0 && 
          (now - state.lastFetchTime) < state.cacheExpiry) {
        return
      }

      set({ loadingAllArrays: true, errorAllArrays: null })
      try {
        const response = await fetchArrays()
        set({
          arraysList: response,
          loadingAllArrays: false,
          lastFetchTime: now,
        })
      } catch (error) {
        set({
          errorAllArrays: error instanceof Error ? error.message : 'Произошла ошибка при загрузке',
          loadingAllArrays: false,
        })
      }
    },
  }))
}

// Мокаем Date.now для контроля времени в тестах
const mockDateNow = jest.spyOn(Date, 'now')

describe('useArraysStore', () => {
  let useTestStore: ReturnType<typeof createTestStore>

  beforeEach(() => {
    jest.clearAllMocks()
    mockDateNow.mockReturnValue(1000000)
    useTestStore = createTestStore()
  })

  afterAll(() => {
    mockDateNow.mockRestore()
  })

  it('имеет правильное начальное состояние', () => {
    const { result } = renderHook(() => useTestStore())
    
    expect(result.current.arraysList).toEqual([])
    expect(result.current.loadingAllArrays).toBe(false)
    expect(result.current.errorAllArrays).toBe(null)
    expect(result.current.cacheExpiry).toBe(5 * 60 * 1000)
  })

  it('успешно загружает данные массивов', async () => {
    const mockArrays = [
      {
        id: 1,
        name: 'push',
        description: 'Добавляет элементы в конец массива',
        syntax: 'array.push(element)',
        adultExample: 'arr.push(4)',
        childExample: 'toys.push("мячик")',
        childExplanation: 'Добавляем новую игрушку в коробку',
      },
    ]

    mockFetchArrays.mockResolvedValueOnce(mockArrays)

    const { result } = renderHook(() => useTestStore())

    await act(async () => {
      await result.current.fetchAllArraysList()
    })

    expect(result.current.arraysList).toEqual(mockArrays)
    expect(result.current.loadingAllArrays).toBe(false)
    expect(result.current.errorAllArrays).toBe(null)
    expect(result.current.lastFetchTime).toBe(1000000)
    expect(mockFetchArrays).toHaveBeenCalledTimes(1)
  })

  it('обрабатывает ошибки при загрузке', async () => {
    const errorMessage = 'Network error'
    mockFetchArrays.mockRejectedValueOnce(new Error(errorMessage))

    const { result } = renderHook(() => useTestStore())

    await act(async () => {
      await result.current.fetchAllArraysList()
    })

    expect(result.current.arraysList).toEqual([])
    expect(result.current.loadingAllArrays).toBe(false)
    expect(result.current.errorAllArrays).toBe(errorMessage)
  })

  it('обрабатывает не-Error объекты в catch блоке', async () => {
    mockFetchArrays.mockRejectedValueOnce('String error')

    const { result } = renderHook(() => useTestStore())

    await act(async () => {
      await result.current.fetchAllArraysList()
    })

    expect(result.current.errorAllArrays).toBe('Произошла ошибка при загрузке')
  })

  it('использует кэш если данные свежие', async () => {
    const mockArrays = [{ id: 1, name: 'test' }] as any[]
    
    mockFetchArrays.mockResolvedValueOnce(mockArrays)

    const { result } = renderHook(() => useTestStore())

    // Первый запрос - загружаем данные
    await act(async () => {
      await result.current.fetchAllArraysList()
    })

    expect(mockFetchArrays).toHaveBeenCalledTimes(1)

    // Второй запрос - должен использовать кэш
    await act(async () => {
      await result.current.fetchAllArraysList()
    })

    // API не должен быть вызван повторно
    expect(mockFetchArrays).toHaveBeenCalledTimes(1)
    expect(result.current.arraysList).toEqual(mockArrays)
  })

  it('игнорирует кэш при force=true', async () => {
    const firstArrays = [{ id: 1, name: 'first' }] as any[]
    const secondArrays = [{ id: 2, name: 'second' }] as any[]
    
    mockFetchArrays
      .mockResolvedValueOnce(firstArrays)
      .mockResolvedValueOnce(secondArrays)

    const { result } = renderHook(() => useTestStore())

    // Первый запрос
    await act(async () => {
      await result.current.fetchAllArraysList()
    })

    expect(result.current.arraysList).toEqual(firstArrays)

    // Второй запрос с force=true
    await act(async () => {
      await result.current.fetchAllArraysList(true)
    })

    expect(mockFetchArrays).toHaveBeenCalledTimes(2)
    expect(result.current.arraysList).toEqual(secondArrays)
  })
})