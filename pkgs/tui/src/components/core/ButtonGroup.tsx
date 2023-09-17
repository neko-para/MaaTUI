import { Box, Text } from 'ink'
import React, { ReactElement, useState } from 'react'

import { Table } from './Table.js'

export type Props = {
  item: string[]
  get: (item: string, idx: number) => ReactElement
  type?: 'column' | 'row'
  onSelect?: (item: string, idx: number) => void
}

export function ButtonGroup(props: Props) {
  const type = props.type ?? 'column'
  const [focus, setFocus] = useState<number | null>(0)

  const buildColumn = (row: number, col: number) => {
    switch (col) {
      case 0:
        return <Text>{row === focus ? '>' : ' '}</Text>
      case 1:
        return props.get(props.item[row], row)
      default:
        return <Box></Box>
    }
  }

  const buildRow = (_: number, col: number) => {
    return (
      <Box>
        <Text>{col === focus ? '>' : ' '}</Text>
        {props.get(props.item[col], col)}
      </Box>
    )
  }

  return (
    <Table
      row={type === 'column' ? props.item.length : 1}
      col={type === 'column' ? 2 : props.item.length}
      get={type === 'column' ? buildColumn : buildRow}
      gap={type === 'column' ? 0 : 1}
      focus
      onFocus={v => {
        setFocus(v)
      }}
      selectCol={type === 'row'}
      onSelect={i => {
        props.onSelect?.(props.item[i], i)
      }}
    ></Table>
  )
}
