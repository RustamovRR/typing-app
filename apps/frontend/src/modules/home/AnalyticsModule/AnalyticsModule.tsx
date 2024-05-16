'use client'

import { FC } from 'react'
import { useCalculateAccuracy, useCalculateWPM } from './hooks'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui'
import { TIMER_DURATION_OPTIONS } from '@/constants'
import { useTypingStore } from '@/store'
import { useShallow } from 'zustand/react/shallow'
import { TimerDurationOptionsType } from '@/types'
import { useTimer } from '@/hooks'

interface IProps {}

const AnalyticsModule: FC<IProps> = (): JSX.Element => {
  const { timerDuration, updateTypingState } = useTypingStore(useShallow((state) => state))
  const wpm = useCalculateWPM()
  const accuracy = useCalculateAccuracy()
  const timer = useTimer()

  return (
    <div className="mt-5">
      <div className="w-3/5 mx-auto flex items-center gap-3">
        <h1>Anayltics Test</h1>
        <div>WPM: {wpm}</div>
        <div>ACC: {accuracy ?? 100}%</div>
        <section className="flex items-center">
          <Tabs
            value={timerDuration.toString()}
            defaultValue={timerDuration.toString()}
            onValueChange={(value) => updateTypingState('timerDuration', Number(value) as TimerDurationOptionsType)}
          >
            <TabsList>
              {TIMER_DURATION_OPTIONS.map((time) => (
                <TabsTrigger key={time} value={time.toString()}>
                  {time}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </section>
      </div>
    </div>
  )
}

export default AnalyticsModule
