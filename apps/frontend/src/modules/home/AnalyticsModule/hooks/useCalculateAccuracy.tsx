import { useTypingStore } from '@/store'

const useCalculateAccuracy = () => {
  const { totalChars, correctChars } = useTypingStore((state) => state)

  if (totalChars === 0) return
  const accuracy = (correctChars / totalChars) * 100

  return accuracy.toFixed(0)
}

export default useCalculateAccuracy
