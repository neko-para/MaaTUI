import { MaaConfig } from '@maa/loader'

import { toolkit } from '../../maa.js'

export const controller = {
  addConfig(name = 'SKLand') {
    const cfg = MaaConfig.add(toolkit, name)
    if (!cfg) {
      return null
    }
    cfg.description = '森空岛'
    const ts = cfg.taskSize()
    for (let i = 0; i < ts; i++) {
      const task = cfg.task(i)
      if (!task) {
        continue
      }
      if (task.name === 'skland.sign') {
        return task
      }
    }
    const task = cfg.taskClone('skland.sign')
    if (!task) {
      return null
    }
    task.entry = 'Skland'
    task.description = '签到的主任务'
    task.enabled = true
    return task
  }
}
