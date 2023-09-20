import { MaaConfig } from '@maa/loader'
import { Box, Text } from 'ink'
import { autorun, reaction } from 'mobx'
import { Observer } from 'mobx-react'
import React, { useContext, useEffect, useState } from 'react'

import { getMaaConfig, initMaa, toolkit } from '../../maa.js'
import { config } from '../../stores/config.js'
import { TargetMap } from '../../target/index.js'
import { useInputHint, whenInput } from '../../utils.js'
import { ButtonGroup, Group, Table } from '../core/index.js'

export function ConfigGroup() {
  const cfg = useContext(config)
  const [maaCfg, setMaaCfg] = useState<MaaConfig[]>([])
  const [focusConfig, setFocusConfig] = useState<number | null>(null)

  const syncMaaCfg = () => {
    const cfgs = getMaaConfig()
    cfg.setCurrentConfig(cfgs.current)
    setMaaCfg(cfgs.configs)
  }

  const buildConfig = (row: number, col: number) => {
    switch (col) {
      case 0:
        return (
          <Observer>
            {() => {
              return (
                <Text underline={focusConfig === row}>
                  {maaCfg[row].equal(cfg.currentConfig) ? 'x' : ' '}
                </Text>
              )
            }}
          </Observer>
        )
      case 1:
        return <Text underline={focusConfig === row}>{maaCfg[row].name}</Text>
      case 2:
        return <Text underline={focusConfig === row}>{maaCfg[row].description}</Text>
      case 3:
        return <Text underline={focusConfig === row}>{maaCfg[row].get('app') ?? '<未设置>'}</Text>
      default:
        return <Box></Box>
    }
  }

  useEffect(() => {
    syncMaaCfg()
    return reaction(
      () => cfg.sync,
      () => {
        syncMaaCfg()
      }
    )
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
      }),
      whenInput('r', '执行', async () => {
        const cc = cfg.currentConfig
        if (cc === null || cfg.activeDevice === null) {
          return
        }
        const app = cc.get('app')
        if (!app) {
          return
        }
        const maa = await initMaa(cfg)
        if (!maa) {
          return
        }
        maa.hCtrl.setShortSide(720)
        if (!(await maa.hRes.load(TargetMap[app].resource))) {
          await maa.clean()
          return
        }
        if (!maa.hInst.inited) {
          await maa.clean()
          return
        }
        if (!cc.bind(maa.hInst)) {
          await maa.clean()
          return
        }
        console.log('inited!')
        cc.postAll()
        await cc.waitAll()
        console.log('finish')
      })
    ],
    focusConfig !== null
  )

  return (
    <Group title="配置">
      {inputUsage}
      <Observer>
        {() => (
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
              cfg.setCurrentConfig(maaCfg[v])
            }}
          ></Table>
        )}
      </Observer>
    </Group>
  )
}
