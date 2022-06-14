import mapValues from 'lodash/mapValues'

interface Circle {
  type: 'CIRCLE'
  id: string
  diameter: number
  rotate: () => void

}

interface Rectangle {
  type: 'RECTANGLE'
  id: string
  height: number
  width: number
  move: () => void
}

type Shape = Circle | Rectangle

type Base = {
  jump: () => void
}

const config = {
  configuration: {
    type: 'toggle-block'
  },
  databases: {
    type: 'toggle-block'
  },
  general: {
    type: 'toggle-block'
  }
}

type OPTIONS = 'ONE' | 'TWO'
type BaseConfig = { [type: string]: OPTIONS }
type ToggleApp = {
  addToggle: (name: string, values: Record<string, any>) => Promise<any>
}
type DatabaseApp = {
  addRow: (name: string, values: string[]) => Promise<any>
}
type AdvancedConfig = BaseConfig & (ToggleApp | DatabaseApp)

type Config<K extends string> = Record<K, { type: 'CIRCLE' | 'RECTANGLE' }>

function blocksHandler<K extends string>(
  config: Config<K>
): Record<K, (Rectangle | Circle) & Base> {
  return mapValues(config, (v, k) => {
    if (v.type === 'CIRCLE') {
      return { type: 'CIRCLE' as const, diameter: 3, id: 'fdfd', rotate: () => {}, jump: () => {} }
    } else {
      return {
        type: 'RECTANGLE' as const,
        height: 3,
        width: 5,
        id: 'fdfd',
        move: () => {},
        jump: () => {}
      }
    }
  })
}

const conf = {one: {type: 'CIRCLE', }, two: {type: 'RECTANGLE'  }} as const


const result = blocksHandler(conf)





// result.one.toggle

// result.two.move()

if (result.one.type === 'CIRCLE') {
  result.one.rotate()
}