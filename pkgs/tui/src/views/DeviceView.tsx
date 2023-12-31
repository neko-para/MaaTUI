import { Box } from 'ink'
import React from 'react'

import { KnownDeviceGroup } from '../components/group/KnownDeviceGroup.js'
import { ScanDeviceGroup } from '../components/group/ScanDeviceGroup.js'

export function DeviceView() {
  return (
    <Box>
      <KnownDeviceGroup></KnownDeviceGroup>
      <ScanDeviceGroup></ScanDeviceGroup>
    </Box>
  )
}
