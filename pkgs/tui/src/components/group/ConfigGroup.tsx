import { Box, Text } from 'ink'
import { Observer } from 'mobx-react'
import React, { useContext, useEffect, useState } from 'react'

import { getMaaConfig, toolkit } from '../../maa.js'
import { config } from '../../stores/config.js'
import { ButtonGroup, Group, Table } from '../core/index.js'

export function ConfigGroup() {
  const cfg = useContext(config)
  const [currentMaaCfg, setCurrentMaaCfg] = useState<string | null>(null)
  const [maaCfg, setMaaCfg] = useState<
    {
      name: string
      desc: string
    }[]
  >([])
  const [focusConfig, setFocusConfig] = useState<number | null>(null)

  const syncMaaCfg = () => {
    const cfgs = getMaaConfig()
    setCurrentMaaCfg(cfgs.current?.name ?? null)
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
  )
}
