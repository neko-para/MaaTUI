import { Observer } from 'mobx-react'
import { useContext } from 'react'
import React from 'react'

import { config } from '../../stores/config.js'
import { SKLand } from '../../target/skland/index.js'

export function TargetNavigationView() {
  const cfg = useContext(config)
  return (
    <Observer>
      {() => {
        switch (cfg.target) {
          case 'skland':
            return <SKLand.Control></SKLand.Control>
        }
      }}
    </Observer>
  )
}
