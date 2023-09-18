import { MaaConfig, MaaTask } from '@maa/loader'
import { Box, Text } from 'ink'
import { computed } from 'mobx'
import { Observer } from 'mobx-react'
import React, { useContext } from 'react'

import { getMaaConfig } from '../../maa.js'
import { config } from '../../stores/config.js'
import { Group } from '../core/index.js'

export function ConfigTaskGroup() {
  const cfg = useContext(config)
  const task = computed(() => {
    const cur = getMaaConfig().configs.find(x => x.name === cfg.currentConfig)
    if (!cur) {
      return []
    }
    const taskSize = cur.taskSize()
    return Array.from({ length: taskSize }, (_, idx) => cur.task(idx)).filter(
      (t): t is MaaTask => t !== null
    )
  })

  return (
    <Group title="任务配置">
      <Observer>
        {() => (
          <Box>
            {task.get().map((t, i) => (
              <Box key={i} gap={1}>
                <Text>{t.name}</Text>
                <Text>{t.description}</Text>
              </Box>
            ))}
          </Box>
        )}
      </Observer>
    </Group>
  )
}
