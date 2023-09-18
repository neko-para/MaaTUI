import { Text } from 'ink'
import { Observer } from 'mobx-react'
import React, { useContext } from 'react'

import { ButtonGroup, Group } from '../components/core/index.js'
import { config } from '../stores/config.js'

export function NavigationGroup() {
  const cfg = useContext(config)
  const info = [
    {
      text: '设备',
      to: 'device'
    },
    {
      text: '任务',
      to: 'task'
    }
  ]
  return (
    <Group title="导航" direction="column">
      <ButtonGroup
        item={info.map(x => x.text)}
        get={(s, i) => <Observer>{() => <Text bold={info[i].to === cfg.view}>{s}</Text>}</Observer>}
        onSelect={(_, i) => {
          cfg.setView(info[i].to)
        }}
      ></ButtonGroup>
    </Group>
  )
}
