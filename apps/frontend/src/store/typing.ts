import { TimerDurationOptionsType } from '@/types'
import { create } from 'zustand'

const textContent =
  'Typing is a skill that requires practice and dedication. The more you type, the faster and more accurate you become. Regular practice with varied texts can significantly improve your speed and reduce errors. Keep challenging yourself with different passages to enhance your typing proficiency'

interface ITypingStore {
  inputValue: string
  valueLength: number
  isTyping: boolean
  isTypingStarted: boolean
  isTypingFinished: boolean
  timerDuration: TimerDurationOptionsType
  totalChars: number
  correctChars: number
  incorrectChars: number
  text: string
  currentTextPartIndex: number
  isCurrentCharCorrect: boolean
  updateTypingState: <K extends keyof Omit<ITypingStore, 'updateTypingState'>>(key: K, value: ITypingStore[K]) => void
}

const useTypingStore = create<ITypingStore>((set) => ({
  inputValue: '',
  valueLength: 0,
  isTyping: false,
  isTypingStarted: false,
  isTypingFinished: false,
  timerDuration: 60,
  correctChars: 0,
  totalChars: 0,
  incorrectChars: 0,
  text: textContent,
  currentTextPartIndex: 0,
  isCurrentCharCorrect: true,
  updateTypingState: (key, value) => {
    set({ [key]: value })
  },
}))

export default useTypingStore
