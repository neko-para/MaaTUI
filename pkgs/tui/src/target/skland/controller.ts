import { MaaConfig } from '@maa/loader'

import { toolkit } from '../../maa.js'

export const controller = {
  addConfig(name = 'SKLand') {
    const hcfg = MaaConfig.add(toolkit, name)
    if (!hcfg) {
      return null
    }
    hcfg.description = '森空岛'
    const ts = hcfg.taskSize()
    for (let i = 0; i < ts; i++) {
      const task = hcfg.task(i)
      if (!task) {
        continue
      }
      if (task.name === 'skland.sign') {
        return task
      }
    }
    const task = hcfg.taskClone('skland.sign')
    if (!task) {
      return null
    }
    task.entry = 'Skland'
    task.description = '签到的主任务'
    task.enabled = true
    return task
  }
}
