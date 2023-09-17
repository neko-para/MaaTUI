import { MaaConfig, MaaController, MaaInstance, MaaResource, MaaToolKitLoader } from '@maa/loader'

import { Config } from './stores/config.js'

export const toolkit = new MaaToolKitLoader()
export const framework = toolkit.framework
toolkit.load('./install/bin')
toolkit.init()

export function getMaaConfig() {
  const size = MaaConfig.size(toolkit)
  return {
    configs: Array.from({ length: size }, (_, idx) => MaaConfig.get(toolkit, idx)),
    current: MaaConfig.current(toolkit)
  }
}

export async function initMaa(cfg: Config) {
  if (cfg.active === null) {
    return null
  }

  const device = cfg.device[cfg.active]

  const hCtrl = MaaController.createAdbController(
    framework,
    device.adbPath,
    device.adbSerial,
    device.adbControllerType,
    device.adbConfig,
    (msg, details) => {
      console.log(msg, details)
    }
  )
  const hRes = new MaaResource(framework, (msg, details) => {
    console.log(msg, details)
  })
  const curCfg = MaaConfig.current(toolkit)
  const hInst = new MaaInstance(framework, (msg, details) => {
    console.log(msg, details)
  })
  curCfg.bind(hInst)
  hInst.bindController(hCtrl)
  hInst.bindResource(hRes)

  const clean = async () => {
    await hInst.destroy()
    await hRes.destroy()
    await hCtrl.destroy()
  }

  return {
    hCtrl,
    hRes,
    hInst,
    clean
  }
}
