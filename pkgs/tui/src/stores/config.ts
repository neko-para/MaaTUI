import { MaaDevice } from '@maa/loader'
import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { observable } from 'mobx'
import { createContext } from 'react'

const localConfig = 'maatui.config.json'

export interface Config {
  device: MaaDevice[]
  active: null | number

  setDevice: (d: MaaDevice[]) => void
  setActive: (a: number | null) => void

  view: string

  setView: (v: string) => void

  target: 'skland'

  setTarget: (t: 'skland') => void

  load: () => Promise<void>
  save: () => Promise<void>
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
    },

    load: async () => {
      if (existsSync(localConfig)) {
        const obj = JSON.parse(await readFile(localConfig, 'utf-8'))
        self.setDevice(obj.device)
        self.setActive(obj.active)
      }
    },
    save: async () => {
      await writeFile(
        localConfig,
        JSON.stringify(
          {
            device: self.device,
            active: self.active
          },
          null,
          2
        )
      )
    }
  } satisfies Config as Config)
  return self
}
