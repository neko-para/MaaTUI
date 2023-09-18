import { Box } from 'ink'
import React, { useState } from 'react'

import { ConfigGroup } from '../components/group/ConfigGroup.js'
import { ConfigTaskGroup } from '../components/group/ConfigTaskGroup.js'
import { TaskPresetGroup } from '../components/group/TaskPresetGroup.js'

export function ConfigView() {
  return (
    <Box>
      <ConfigGroup></ConfigGroup>
      <ConfigTaskGroup></ConfigTaskGroup>
      <TaskPresetGroup></TaskPresetGroup>
    </Box>
  )
}
