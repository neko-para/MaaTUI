import { Box } from 'ink'
import React from 'react'

import { ConfigGroup } from '../components/group/ConfigGroup.js'
import { TaskRunGroup } from '../components/group/TaskRunGroup.js'

export function TaskRun() {
  return (
    <Box>
      <ConfigGroup></ConfigGroup>
      <TaskRunGroup></TaskRunGroup>
    </Box>
  )
}
