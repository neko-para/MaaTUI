import { Text } from 'ink'
import { Observer } from 'mobx-react'
import React, { useContext } from 'react'

import { Group } from '../components/core/index.js'
import { config } from '../stores/config.js'
import { AndroidDevice } from './AndroidDevice.js'
import { TaskRun } from './TaskRun.js'

export function ContentView() {
  const cfg = useContext(config)

  return (
    <Observer>
      {() => {
        switch (cfg.view) {
          case 'device':
            return <AndroidDevice></AndroidDevice>
          case 'task':
            return <TaskRun></TaskRun>
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
