import { Timeline } from 'antd'
import * as React from 'react'
import { TimelineCompProps } from './Interfaces'

const TimelineComp: React.FC<TimelineCompProps> = ({ items }) => {
  if (!items) return null

  return (
    <Timeline mode="alternate">
      {items.map((item: React.ReactNode, i: number) => {
        return <Timeline.Item key={i}>{item}</Timeline.Item>
      })}
      {/* <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item> */}
    </Timeline>
  )
}

export default TimelineComp
