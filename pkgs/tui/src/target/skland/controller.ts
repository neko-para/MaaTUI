import { MaaConfig } from '@maa/loader'

export const controller = {
  addConfig(cfg: MaaConfig) {
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
    task.description = '森空岛签到'
    task.enabled = true
    task.param = {
      diff_task: {
        Sub_StartSkland: {
          package: 'com.hypergryph.skland/com.hypergryph.skland.SplashActivity'
        },
        CloseSkland: {
          package: 'com.hypergryph.skland'
        }
      }
    }
    return task
  }
}
