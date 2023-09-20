interface OptionInfo {
  type: 'boolean' | 'string'
  description: string
}

type GetOptionType<T extends OptionInfo> = T['type'] extends 'boolean'
  ? boolean
  : T['type'] extends 'string'
  ? string
  : never

type GetAllOptionType<Opt extends Record<string, OptionInfo>> = {
  [key in keyof Opt]: GetOptionType<Opt[key]>
}

interface TargetTaskInfoTyped<Opt extends Record<string, OptionInfo> = {}> {
  name: string
  entry: string
  description: string
  baseDiff?: Record<string, unknown>
  option?: Opt
  optionDiff?: (opt: GetAllOptionType<Opt>) => Record<string, unknown>
}

export interface TargetTaskInfo {
  name: string
  entry: string
  description: string
  baseDiff?: Record<string, unknown>
  option?: Record<string, OptionInfo>
  optionDiff?: (opt: Record<string, string | boolean>) => Record<string, unknown>
}

export function defTask<Opt extends Record<string, OptionInfo> = {}>(_: TargetTaskInfoTyped<Opt>) {
  return _ as TargetTaskInfo
}

export interface TargetPackage {
  name: string
  id: string
  resource: string
  task: TargetTaskInfo[]
}
