import { Box, Text } from 'ink'
import { Observer } from 'mobx-react'
import React, { useContext, useEffect, useState } from 'react'

import { getMaaConfig, toolkit } from '../../maa.js'
import { config } from '../../stores/config.js'
import { ButtonGroup, Group, Table } from '../core/index.js'

export function AndroidDeviceGroup() {
  const cfg = useContext(config)
  const [focusDevice, setFocusDevice] = useState<number | null>(null)
  const [currentMaaCfg, setCurrentMaaCfg] = useState<string | null>(null)
  const [maaCfg, setMaaCfg] = useState<
    {
      name: string
      desc: string
    }[]
  >([])
  const [focusConfig, setFocusConfig] = useState<number | null>(null)

  const performScan = () => {
    const dv = toolkit.find_device()
    cfg.setDevice(dv)
    if (cfg.active === null && dv.length > 0) {
      cfg.setActive(0)
    }
  }

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
      default:
        return <Box></Box>
    }
  }

  const syncMaaCfg = () => {
    const cfgs = getMaaConfig()
    setCurrentMaaCfg(cfgs.current.name)
    setMaaCfg(
      cfgs.configs.map(c => ({
        name: c.name,
        desc: c.description
      }))
    )
  }

  const buildConfig = (row: number, col: number) => {
    switch (col) {
      case 0:
        return (
          <Text underline={focusConfig === row}>
            {maaCfg[row].name === currentMaaCfg ? 'x' : ' '}
          </Text>
        )
      case 1:
        return <Text underline={focusConfig === row}>{row}</Text>
      case 2:
        return <Text underline={focusConfig === row}>{maaCfg[row].name}</Text>
      case 3:
        return <Text underline={focusConfig === row}>{maaCfg[row].desc}</Text>
      default:
        return <Box></Box>
    }
  }

  useEffect(() => {
    syncMaaCfg()
  }, [])

  return (
    <Box flexDirection="row">
      <Group title="设备">
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
        <Observer>
          {() => (
            <Table
              row={cfg.device.length}
              col={3}
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
      <Group title="配置">
        <Table
          row={maaCfg.length}
          col={4}
          get={buildConfig}
          focus
          onFocus={v => {
            setFocusConfig(v)
          }}
        ></Table>
      </Group>
    </Box>
  )
}
