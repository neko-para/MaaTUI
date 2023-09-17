import React, { useContext } from 'react'

import { Group } from '../../components/core/Group.js'
import { Button } from '../../components/core/index.js'
import { initMaa } from '../../maa.js'
import { config } from '../../stores/config.js'

export function Control() {
  const cfg = useContext(config)

  const play = async () => {
    const maa = await initMaa(cfg)
    if (!maa) {
      return
    }
    maa.hCtrl.setShortSide(720)
    maa.hCtrl.setPackage('com.hypergryph.skland')
    maa.hCtrl.setPackageEntry('com.hypergryph.skland/com.hypergryph.skland.SplashActivity')
    if (!(await maa.hCtrl.connect())) {
      await maa.clean()
      return
    }
    if (!(await maa.hRes.load('resource/SKLand'))) {
      await maa.clean()
      return
    }
    if (!maa.hInst.inited) {
      await maa.clean()
      return
    }
    console.log('inited!')
    await maa.hInst.post('Skland', {
      diff_task: {
        CloseSkland: {
          enabled: true
        }
      }
    }).promise
    console.log('finish')
  }
  return (
    <Group title="森空岛">
      <Button text="启动" onClick={play}></Button>
    </Group>
  )
}
