import { render } from 'ink'
import { createElement } from 'react'
import sourcemap from 'source-map-support'

import './maa'
import { App } from './main.js'

sourcemap.install()

render(createElement(App))
