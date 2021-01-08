import { EmitterSubscription } from 'react-native'

export type Event = 'onShow' | 'onDismiss'
export interface SafaryOptions {
  url: string
  readerMode?: boolean
  tintColor?: string
  barTintColor?: string
  fromBottom?: boolean
}

export function show(options: SafaryOptions): void
export function dismiss(): void
export function isAvailable(): Promise<boolean>
export function addEventListener(event: Event, listener: () => any): EmitterSubscription
export function removeEventListener(event: Event, listener: () => any): void
