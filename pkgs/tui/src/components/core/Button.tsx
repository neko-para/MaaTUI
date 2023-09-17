import { useFocus, useInput } from 'ink'
import { Text } from 'ink'
import React, { PropsWithChildren, useEffect } from 'react'

export type Props = {
  text: string
  onClick?: () => void
  onFocus?: () => void
}

export function Button(props: PropsWithChildren<Props>) {
  const { isFocused } = useFocus()
  useInput((input, key) => {
    if (!isFocused) {
      return
    }
    if (key.return) {
      props.onClick?.()
    }
  })
  useEffect(() => {
    if (isFocused) {
      props.onFocus?.()
    }
  }, [isFocused])

  return <Text underline={isFocused}>{props.text}</Text>
}
