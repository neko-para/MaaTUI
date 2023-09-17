import { Box, Text } from 'ink'
import React, { PropsWithChildren } from 'react'

export type Props = {
  title: string
  direction?: 'row' | 'column'
}

export function Group(props: PropsWithChildren<Props>) {
  return (
    <Box flexDirection="column" borderStyle="single">
      <Box marginTop={-1}>
        <Text>{props.title}</Text>
      </Box>
      <Box marginLeft={1} marginRight={1} flexDirection={props.direction ?? 'column'}>
        {props.children}
      </Box>
    </Box>
  )
}
