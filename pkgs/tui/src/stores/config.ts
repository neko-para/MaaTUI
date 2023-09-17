import { MaaDevice } from '@maa/loader'
import { observable } from 'mobx'
import { createContext } from 'react'

export interface Config {
  device: MaaDevice[]
  active: null | number

  setDevice: (d: MaaDevice[]) => void
  setActive: (a: number | null) => void

  view: string

  setView: (v: string) => void

  target: 'skland'

  setTarget: (t: 'skland') => void
}

export const config = createContext<Config>(null!)
export const initConfig = () => {
  const self = observable({
    device: [],
    active: null,

    setDevice: d => {
      self.device = d
    },
    setActive: a => {
      self.active = a
    },

    view: 'device',

    setView: v => {
      self.view = v
    },

    target: 'skland',

    setTarget: t => {
      self.target = t
    }
  } satisfies Config as Config)
  return self
}
