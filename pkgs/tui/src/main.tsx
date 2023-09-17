import { Box } from 'ink'
import React, { StrictMode } from 'react'

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
  return (
    <StrictMode>
      <config.Provider value={configValue}>
        <Main></Main>
      </config.Provider>
    </StrictMode>
  )
}
