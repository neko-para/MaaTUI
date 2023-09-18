import { MaaDevice } from '@maa/loader'
import { Box, Text } from 'ink'
import React, { useContext, useState } from 'react'

import { toolkit } from '../../maa.js'
import { config } from '../../stores/config.js'
import { ButtonGroup, Group, Table } from '../core/index.js'

export function ScanDeviceGroup() {
  const cfg = useContext(config)
  const [foundDevice, setFoundDevice] = useState<MaaDevice[]>([])
  const [focusDevice, setFocusDevice] = useState<number | null>(null)

  const performScan = () => {
    const dv = toolkit.find_device()
    setFoundDevice(dv)
  }

  const buildDevice = (row: number, col: number) => {
    switch (col) {
      case 0:
        return <Text underline={focusDevice === row}>{row}</Text>
      case 1:
        return <Text underline={focusDevice === row}>{foundDevice[row].name}</Text>
      case 2:
        return <Text underline={focusDevice === row}>{foundDevice[row].adbSerial}</Text>
      default:
        return <Box></Box>
    }
  }

  return (
    <Group title="发现设备">
      <ButtonGroup
        type="row"
        item={['扫描']}
        get={(k, i) => <Text>{k}</Text>}
        onSelect={(_, i) => {
          switch (i) {
            case 0:
              performScan()
          }
        }}
      ></ButtonGroup>
      <Table
        row={foundDevice.length}
        col={3}
        get={buildDevice}
        focus
        onFocus={v => {
          setFocusDevice(v)
        }}
        onSelect={v => {
          const d = foundDevice[v]
          const idx = cfg.device.findIndex(x => x.adbSerial === d.adbSerial)
          if (idx === -1) {
            const nd = [...cfg.device, d]
            cfg.setDevice(nd)
            if (nd.length === 1 && cfg.activeDevice === null) {
              cfg.setActiveDevice(0)
            }
          } else {
            const nd = [...cfg.device]
            nd[idx] = d
            cfg.setDevice(nd)
          }
        }}
      ></Table>
    </Group>
  )
}
