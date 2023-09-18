import { MaaConfig } from '@maa/loader'
import { Box, Text } from 'ink'
import { Observer } from 'mobx-react'
import React, { useContext, useEffect, useState } from 'react'

import { getMaaConfig, toolkit } from '../../maa.js'
import { config } from '../../stores/config.js'
import { useInputHint, whenInput } from '../../utils.js'
import { ButtonGroup, Group, Table } from '../core/index.js'

export function ConfigGroup() {
  const cfg = useContext(config)
  const [maaCfg, setMaaCfg] = useState<
    {
      name: string
      desc: string
    }[]
  >([])
  const [focusConfig, setFocusConfig] = useState<number | null>(null)

  const syncMaaCfg = () => {
    const cfgs = getMaaConfig()
    cfg.setCurrentConfig(cfgs.current?.name ?? null)
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
          <Observer>
            {() => (
              <Text underline={focusConfig === row}>
                {maaCfg[row].name === cfg.currentConfig ? 'x' : ' '}
              </Text>
            )}
          </Observer>
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

  const inputUsage = useInputHint(
    [
      whenInput('a', '添加', () => {
        const names = maaCfg.map(x => x.name)
        const oldName = 'Default'
        if (!MaaConfig.add(toolkit, oldName)) {
          let newName: string
          for (let i = 1; ; i++) {
            newName = `${oldName}${i}`
            if (!names.includes(newName)) {
              break
            }
          }
          MaaConfig.add(toolkit, newName)
        }
        syncMaaCfg()
      }),
      whenInput('c', '复制', () => {
        if (focusConfig === null) {
          return
        }
        const c = MaaConfig.get(toolkit, focusConfig)
        if (!c) {
          return
        }
        const names = maaCfg.map(x => x.name)
        const oldName = c.name
        let newName: string
        for (let i = 1; ; i++) {
          newName = `${oldName}${i}`
          if (!names.includes(newName)) {
            break
          }
        }
        c.clone(newName)
        syncMaaCfg()
      }),
      whenInput('d', '删除', () => {
        if (focusConfig === null) {
          return
        }
        const c = MaaConfig.get(toolkit, focusConfig)
        if (!c) {
          return
        }
        c.del()
        syncMaaCfg()
      })
    ],
    focusConfig !== null
  )

  return (
    <Group title="配置">
      {inputUsage}
      <Table
        row={maaCfg.length}
        col={4}
        get={buildConfig}
        focus
        focusEvenEmpty
        onFocus={v => {
          setFocusConfig(v)
        }}
        onSelect={v => {
          cfg.setCurrentConfig(maaCfg[v].name)
        }}
      ></Table>
    </Group>
  )
}
