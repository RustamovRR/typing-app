import { TimerOptionsType } from '@/types'
import { create } from 'zustand'

const get = () => useTypingStore.getState()

interface ITypingStore {
  inputValue: string
  charIndex: number
  isTyping: boolean
  isTypingStarted: boolean
  timerDurationType: TimerOptionsType
  timer: number
  updateTypingState: <K extends keyof Omit<ITypingStore, 'updateTypingState'>>(key: K, value: ITypingStore[K]) => void
}

const useTypingStore = create<ITypingStore>((set) => ({
  inputValue: '',
  charIndex: 0,
  isTyping: false,
  isTypingStarted: false,
  timerDurationType: 60,
  timer: 60,
  updateTypingState: (key, value) => {
    set({ [key]: value })
  },
}))

export default useTypingStore
