import { Box, useFocus, useInput } from 'ink'
import React, { ReactElement, useEffect, useState } from 'react'

export type Props = {
  row: number
  col: number
  get: (r: number, c: number) => ReactElement
  gap?: number
  rowHeight?: number
  focus?: boolean
  focusEvenEmpty?: boolean
  onFocus?: (idx: number | null) => void
  selectCol?: boolean
  onSelect?: (idx: number) => void
}

export function Table(props: Props) {
  const selCol = props.selectCol ?? false

  const { isFocused } = useFocus({
    isActive: props.focus && (props.focusEvenEmpty || (selCol ? props.col > 0 : props.row > 0))
  })
  const [focus, setFocus] = useState(0)

  useInput((input, key) => {
    if (!isFocused) {
      return
    }
    if (selCol) {
      if (key.leftArrow) {
        if (focus > 0) {
          setFocus(focus - 1)
        }
      } else if (key.rightArrow) {
        if (focus + 1 < props.col) {
          setFocus(focus + 1)
        }
      }
    } else {
      if (key.upArrow) {
        if (focus > 0) {
          setFocus(focus - 1)
        }
      } else if (key.downArrow) {
        if (focus + 1 < props.row) {
          setFocus(focus + 1)
        }
      }
    }
    if (key.return) {
      if (focus !== null && focus >= 0 && focus < props.row) {
        props.onSelect?.(focus)
      }
    }
  })
  useEffect(() => {
    props.onFocus?.(isFocused ? focus : null)
  }, [isFocused, focus])

  return (
    <Box flexDirection="row" gap={props.gap ?? 1}>
      {Array.from({ length: props.col }, (_, col) => {
        return (
          <Box key={col} flexDirection="column">
            {Array.from({ length: props.row }, (_, row) => {
              return (
                <Box key={row} height={props.rowHeight ?? 1}>
                  {props.get(row, col)}
                </Box>
              )
            })}
          </Box>
        )
      })}
    </Box>
  )
}
