import React from 'react'

import { Group } from '../core/index.js'
import { TargetNavigationView } from './TargetNavigationView.js'

export function TaskRunGroup() {
  return (
    <Group title="任务">
      <TargetNavigationView></TargetNavigationView>
    </Group>
  )
}
