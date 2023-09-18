import React from 'react'

import { SKLand } from '../../target/skland/index.js'
import { Group } from '../core/index.js'

export function TaskPresetGroup() {
  return (
    <Group title="预设任务">
      <SKLand.Preset></SKLand.Preset>
    </Group>
  )
}
