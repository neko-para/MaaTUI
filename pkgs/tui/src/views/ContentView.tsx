import { Text } from 'ink'
import { Observer } from 'mobx-react'
import React, { useContext } from 'react'

import { Group } from '../components/core/index.js'
import { config } from '../stores/config.js'
import { ConfigView } from './ConfigView.js'
import { DeviceView } from './DeviceView.js'

export function ContentView() {
  const cfg = useContext(config)

  return (
    <Observer>
      {() => {
        switch (cfg.view) {
          case 'device':
            return <DeviceView></DeviceView>
          case 'config':
            return <ConfigView></ConfigView>
          default:
            return (
              <Group title="错误">
                <Text>未知路由: {cfg.view}</Text>
              </Group>
            )
        }
      }}
    </Observer>
  )
}
