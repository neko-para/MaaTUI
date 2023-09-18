import { MaaConfig, MaaDevice } from '@maa/loader'
import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { observable } from 'mobx'
import { createContext } from 'react'

import { toolkit } from '../maa.js'

const localConfig = 'maatui.config.json'

export interface Config {
  device: MaaDevice[]
  activeDevice: null | number

  setDevice: (d: MaaDevice[]) => void
  setActiveDevice: (a: number | null) => void

  currentConfig: string | null
  setCurrentConfig: (c: string | null) => void

  view: string
  setView: (v: string) => void

  load: () => Promise<void>
  save: () => Promise<void>
}

export const config = createContext<Config>(null!)
export const initConfig = () => {
  const self = observable({
    device: [],
    activeDevice: null,

    setDevice: d => {
      self.device = d
    },
    setActiveDevice: a => {
      self.activeDevice = a
    },

    currentConfig: null,
    setCurrentConfig: (c: string | null) => {
      self.currentConfig = c
      if (c) {
        MaaConfig.setCurrent(toolkit, c)
      }
    },

    view: 'device',
    setView: v => {
      self.view = v
    },

    load: async () => {
      if (existsSync(localConfig)) {
        const obj = JSON.parse(await readFile(localConfig, 'utf-8'))
        self.setDevice(obj.device)
        self.setActiveDevice(obj.active)
      }
    },
    save: async () => {
      await writeFile(
        localConfig,
        JSON.stringify(
          {
            device: self.device,
            active: self.activeDevice
          },
          null,
          2
        )
      )
    }
  } satisfies Config as Config)
  return self
}
