import { defTask } from '../types.js'

export const task = [
  defTask({
    name: 'skland.sign',
    entry: 'Skland',
    description: '签到',
    baseDiff: {
      Sub_StartSkland: {
        package: 'com.hypergryph.skland/com.hypergryph.skland.SplashActivity'
      },
      CloseSkland: {
        package: 'com.hypergryph.skland'
      }
    },
    option: {
      close: {
        type: 'boolean',
        description: '自动关闭'
      }
    },
    optionDiff: opt => {
      return {
        CloseSkland: {
          enabled: opt.close
        }
      }
    }
  })
]
