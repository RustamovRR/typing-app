import { TimerDurationOptionsType } from '@/types'
import { create } from 'zustand'

const textContent =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt provident quibusdam distinctio facere voluptates ex consequuntur expedita. Suscipit ipsum facilis reprehenderit sunt nisi doloribus atque facere modi adipisci! Nesciunt vitae saepe modi soluta exercitationem velit illum libero deleniti obcaecati, eligendi doloremque maiores dolorem minus adipisci nulla aperiam? Rem vel ut doloremque est repellat! Esse quisquam consequatur quas at ab veniam nostrum accusamus similique, autem velit! Cum reiciendis dolore neque eligendi minus debitis optio inventore iste impedit, quidem totam ab voluptatibus beatae error modi! Aliquid rerum fugiat consequuntur reprehenderit sapiente ex nihil aspernatur, nostrum accusantium repellendus! Quas fugiat repellat similique nulla nemo molestias dolorum, autem molestiae alias temporibus modi consecteturo?'

interface ITypingStore {
  inputValue: string
  charIndex: number
  isTyping: boolean
  isTypingStarted: boolean
  timerDuration: TimerDurationOptionsType
  totalChars: number
  correctChars: number
  incorrectChars: number
  text: string
  updateTypingState: <K extends keyof Omit<ITypingStore, 'updateTypingState'>>(key: K, value: ITypingStore[K]) => void
}

const useTypingStore = create<ITypingStore>((set) => ({
  inputValue: '',
  charIndex: 0,
  isTyping: false,
  isTypingStarted: false,
  timerDuration: 60,
  correctChars: 0,
  totalChars: 0,
  incorrectChars: 0,
  text: textContent,
  updateTypingState: (key, value) => {
    set({ [key]: value })
  },
}))

export default useTypingStore
