import { Box, Key, Text, useInput } from 'ink'
import React from 'react'

export interface ActionInfo {
  trigger: string

  desc: string
  action: () => void
}

export function whenInput(trigger: string, desc: string, action: () => void): ActionInfo {
  return {
    trigger,
    desc,
    action
  }
}

export function useInputHint(action: ActionInfo[], active: boolean) {
  useInput((input, key) => {
    if (!active) {
      return
    }
    for (const info of action) {
      if (input === info.trigger) {
        info.action()
        return
      }
    }
  })
  return (
    <Box gap={2}>
      {action.map((info, idx) => {
        return (
          <Box gap={1} key={idx}>
            <Text bold>{info.trigger}</Text>
            <Text>{info.desc}</Text>
          </Box>
        )
      })}
    </Box>
  )
}
