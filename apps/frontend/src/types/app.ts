export enum ESettings {
  'theme',
  'sound',
}
export type SettingsType = keyof typeof ESettings

export enum ESoundSettings {
  'typing',
  'error-typing',
}
export type SoundSettingsType = keyof typeof ESoundSettings
