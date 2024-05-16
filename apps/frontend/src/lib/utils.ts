import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function determineCorrectness(inputValue: string, referenceText: string) {
  let correctCount = 0
  const inputLength = inputValue.length
  const referenceLength = referenceText.length
  const maxLength = Math.min(inputLength, referenceLength)

  for (let i = 0; i < maxLength; i++) {
    if (inputValue[i] === referenceText[i]) {
      correctCount++
    }
  }

  const incorrectCount = inputLength - correctCount
  return { correctCount, incorrectCount }
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  return minutes > 0 ? `${formattedMinutes}:${formattedSeconds}` : formattedSeconds
}
