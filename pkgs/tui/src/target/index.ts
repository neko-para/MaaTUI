import SKLand from './skland/index.js'
import { TargetPackage } from './types.js'

export type { TargetPackage }

export const Targets: TargetPackage[] = [SKLand] as const
export const TargetMap = {
  [SKLand.id]: SKLand
} as const
