import { Text } from 'ink'
import React, { useContext } from 'react'

import { Group } from '../../components/core/Group.js'
import { Button, ButtonGroup } from '../../components/core/index.js'
import { initMaa } from '../../maa.js'
import { config } from '../../stores/config.js'
import { controller } from './controller.js'

export function Preset() {
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
      <ButtonGroup
        type="row"
        item={['签到']}
        get={str => <Text>{str}</Text>}
        onSelect={(str, idx) => {
          switch (idx) {
            case 0:
              if (cfg.currentConfig) {
                controller.addConfig(cfg.currentConfig)
                cfg.triggerSync()
              }
              break
          }
        }}
      ></ButtonGroup>
    </Group>
  )
}
