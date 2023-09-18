import { Text, useApp } from 'ink'
import { Observer } from 'mobx-react'
import React, { useContext } from 'react'

import { ButtonGroup, Group } from '../components/core/index.js'
import { uninitMaa } from '../maa.js'
import { config } from '../stores/config.js'

export function NavigationGroup() {
  const cfg = useContext(config)
  const { exit } = useApp()
  const info = [
    {
      text: '设备',
      to: 'device'
    },
    {
      text: '配置',
      to: 'config'
    },
    {
      text: '任务',
      to: 'task'
    },
    {
      text: '退出',
      to: ''
    }
  ]
  return (
    <Group title="导航" direction="column">
      <ButtonGroup
        item={info.map(x => x.text)}
        get={(s, i) => <Observer>{() => <Text bold={info[i].to === cfg.view}>{s}</Text>}</Observer>}
        onSelect={(_, i) => {
          if (info[i].to === '') {
            uninitMaa()
            exit()
          } else {
            cfg.setView(info[i].to)
          }
        }}
      ></ButtonGroup>
    </Group>
  )
}
