import { MaaConfig, MaaTask } from '@maa/loader'
import { Box, Text } from 'ink'
import { computed } from 'mobx'
import { Observer } from 'mobx-react'
import React, { useContext, useState } from 'react'

import { toolkit } from '../../maa.js'
import { config } from '../../stores/config.js'
import { useInputHint, whenInput } from '../../utils.js'
import { Group, Table } from '../core/index.js'

export function ConfigTaskGroup() {
  const cfg = useContext(config)
  const [focusTask, setFocusTask] = useState<null | number>(null)
  const task = computed(() => {
    const cur = cfg.currentConfig
    if (!cur) {
      return []
    }
    const taskSize = cur.taskSize()
    return Array.from({ length: taskSize }, (_, idx) => cur.task(idx)).filter(
      (t): t is MaaTask => t !== null
    )
  })

  const buildTask = (row: number, col: number) => {
    switch (col) {
      case 0:
        return <Text underline={focusTask === row}>{task.get()[row].enabled ? 'x' : ' '}</Text>
      case 1:
        return <Text underline={focusTask === row}>{task.get()[row].name}</Text>
      case 2:
        return <Text underline={focusTask === row}>{task.get()[row].description}</Text>
      default:
        return <Box></Box>
    }
  }

  const inputUsage = useInputHint(
    [
      whenInput('d', '删除', () => {
        if (focusTask === null) {
          return
        }
        MaaConfig.current(toolkit)?.taskDel(task.get()[focusTask])
        cfg.triggerSync()
      })
    ],
    focusTask !== null
  )

  return (
    <Group title="任务配置">
      {inputUsage}
      <Observer>
        {() => (
          <Table
            row={task.get().length}
            col={3}
            get={buildTask}
            focus
            onFocus={v => setFocusTask(v)}
            onSelect={v => {
              task.get()[v].enabled = !task.get()[v].enabled
              cfg.triggerSync()
            }}
          ></Table>
        )}
      </Observer>
    </Group>
  )
}
