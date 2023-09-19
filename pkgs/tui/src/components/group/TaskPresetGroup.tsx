import { Box, Text } from 'ink'
import React, { useContext, useState } from 'react'

import { config } from '../../stores/config.js'
import { TargetPackage, Targets } from '../../target/index.js'
import { SKLand } from '../../target/skland/index.js'
import { Group, Table } from '../core/index.js'

function TaskPreset(props: { package: TargetPackage }) {
  const cfg = useContext(config)
  const [focusTask, setFocusTask] = useState<number | null>(null)
  const buildTask = (row: number, col: number) => {
    switch (col) {
      case 0:
        return <Text underline={row === focusTask}>{props.package.task[row].description}</Text>
      case 1:
        return <Text underline={row === focusTask}>{props.package.task[row].name}</Text>
      default:
        return <Box></Box>
    }
  }

  return (
    <Group title={props.package.name}>
      <Table
        row={props.package.task.length}
        col={2}
        get={buildTask}
        focus
        onFocus={v => {
          setFocusTask(v)
        }}
        onSelect={v => {
          const c = cfg.currentConfig
          if (!c || focusTask === null) {
            return
          }
          const task = props.package.task[focusTask]
          const hTask = c.taskClone(task.name)
          if (!hTask) {
            return
          }
          hTask.entry = task.entry
          hTask.description = task.description
          hTask.param = task.baseDiff ?? '{}'
          cfg.triggerSync()
        }}
      ></Table>
    </Group>
  )
}

export function TaskPresetGroup() {
  return (
    <Group title="预设任务">
      {Targets.map(pack => (
        <TaskPreset key={pack.name} package={pack}></TaskPreset>
      ))}
    </Group>
  )
}
