'use client'

import { FC } from 'react'
import { useCalculateAccuracy, useCalculateWPM, useTimer } from './hooks'

interface IProps {}

const AnalyticsModule: FC<IProps> = (): JSX.Element => {
  const wpm = useCalculateWPM()
  const accuracy = useCalculateAccuracy()
  const timer = useTimer()

  return (
    <div className="flex gap-3 mt-5">
      <h1>Anayltics Test</h1>
      <div>WPM: {wpm}</div>
      <div>ACC: {accuracy ?? 100}%</div>
      <div>Time: {timer}s</div>
    </div>
  )
}

export default AnalyticsModule
