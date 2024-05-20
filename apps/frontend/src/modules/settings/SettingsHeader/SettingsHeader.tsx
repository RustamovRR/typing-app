'use client'

import React, { useState } from 'react'
import { Switch, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { SETTINGS_TYPE_OPTIONS, SOUND_SETTINGS_TYPE_OPTIONS } from '@/constants'
import { SettingsType } from '@/types'

const SettingsHeader = () => {
  const [activeTab, setActiveTab] = useState<SettingsType>('sound')

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
                <Switch id="typing-sound"></Switch>
              </section>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsHeader
