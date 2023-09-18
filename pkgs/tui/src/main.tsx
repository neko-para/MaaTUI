import { existsSync } from 'fs'
import * as fs from 'fs/promises'
import { Box } from 'ink'
import { autorun } from 'mobx'
import React, { StrictMode, useEffect } from 'react'

import { config, initConfig } from './stores/config.js'
import { ContentView } from './views/ContentView.js'
import { NavigationGroup } from './views/NavigationView.js'

function Main() {
  return (
    <Box flexDirection="row">
      <NavigationGroup></NavigationGroup>
      <ContentView></ContentView>
    </Box>
  )
}

export function App() {
  const configValue = initConfig()
  useEffect(() => {
    configValue.load().then(() => {
      autorun(() => {
        configValue.save()
      })
    })
  }, [])
  return (
    <StrictMode>
      <config.Provider value={configValue}>
        <Main></Main>
      </config.Provider>
    </StrictMode>
  )
}
