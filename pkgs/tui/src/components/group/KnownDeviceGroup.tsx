import { Box, Text } from 'ink'
import { Observer } from 'mobx-react'
import React, { useContext, useEffect, useState } from 'react'

import { getMaaConfig, toolkit } from '../../maa.js'
import { config } from '../../stores/config.js'
import { ButtonGroup, Group, Table } from '../core/index.js'

export function KnownDeviceGroup() {
  const cfg = useContext(config)
  const [focusDevice, setFocusDevice] = useState<number | null>(null)

  const buildDevice = (row: number, col: number) => {
    switch (col) {
      case 0:
        return (
          <Observer>
            {() => <Text underline={focusDevice === row}>{cfg.active === row ? 'x' : ' '}</Text>}
          </Observer>
        )
      case 1:
        return <Text underline={focusDevice === row}>{row}</Text>
      case 2:
        return (
          <Observer>
            {() => <Text underline={focusDevice === row}>{cfg.device[row].name}</Text>}
          </Observer>
        )
      case 3:
        return (
          <Observer>
            {() => <Text underline={focusDevice === row}>{cfg.device[row].adbSerial}</Text>}
          </Observer>
        )
      default:
        return <Box></Box>
    }
  }

  return (
    <Group title="已知设备">
      <Observer>
        {() => (
          <Table
            row={cfg.device.length}
            col={4}
            get={buildDevice}
            focus
            onFocus={v => {
              setFocusDevice(v)
            }}
            onSelect={v => {
              cfg.setActive(v)
            }}
          ></Table>
        )}
      </Observer>
    </Group>
  )
}
