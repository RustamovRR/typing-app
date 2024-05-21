'use client'

import React, { useState } from 'react'
import { Switch, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { SETTINGS_TYPE_OPTIONS, SOUND_SETTINGS_TYPE_OPTIONS } from '@/constants'
import { SettingsType, SoundSettingsType } from '@/types'
import { useSoundStore } from '@/store'
import { useShallow } from 'zustand/react/shallow'

const SettingsHeader = () => {
  const [activeTab, setActiveTab] = useState<SettingsType>('sound')
  const { isDisabledTypingSound, isDisabledErrorTypingSound, updateSoundStore } = useSoundStore(
    useShallow((state) => state),
  )

  const handleChangeSwitch = (key: SoundSettingsType, value: boolean) => {
    if (key === 'typing') {
      updateSoundStore('isDisabledTypingSound', value)
    } else if (key === 'error-typing') {
      updateSoundStore('isDisabledErrorTypingSound', value)
    }
  }

  return (
    <div className="flex items-center gap-4 animate-fade-in">
      <Tabs
        value={activeTab}
        defaultValue={SETTINGS_TYPE_OPTIONS[0].value}
        onValueChange={(value) => setActiveTab(value as SettingsType)}
        className="w-full"
      >
        <TabsList>
          {SETTINGS_TYPE_OPTIONS.map(({ label, value }) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="theme" className="animate-fade-in">
          Themes
        </TabsContent>
        <TabsContent value="sound" className="mt-4 flex flex-col gap-4">
          {SOUND_SETTINGS_TYPE_OPTIONS.map(({ label: soundLabel, value: soundValue }) => (
            <div key={soundValue} className="w-3/5 flex items-center justify-between animate-fade-in">
              <h2 className="text-xl">{soundLabel}</h2>
              <section className="flex items-center">
                <Switch
                  id="typing-sound"
                  checked={soundValue === 'typing' ? isDisabledTypingSound : isDisabledErrorTypingSound}
                  onCheckedChange={(checked) => handleChangeSwitch(soundValue, checked)}
                ></Switch>
              </section>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsHeader
