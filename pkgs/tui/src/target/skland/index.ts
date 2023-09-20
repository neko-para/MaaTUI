import { TargetPackage } from '../types.js'
import { Preset } from './Preset.js'
import { controller } from './controller.js'
import { task } from './task.js'

export const SKLand = {
  Preset,
  controller,
  task
}

export default {
  name: '森空岛',
  id: 'skland',
  resource: 'SKLand',
  task
} satisfies TargetPackage
