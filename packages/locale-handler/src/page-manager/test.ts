// interface Circle {
//   type: 'CIRCLE'
//   id: string
//   diameter: number
// }

// interface Rectangle {
//   type: 'RECTANGLE'
//   id: string
//   height: number
//   width:  number
  
// }

// type Shape = Circle | Rectangle

// type Base  = { 
//   toggle: () => void
// }

// const config = {
//   configuration: {
//     type: 'toggle-block'
//   },
//   databases: {
//     type: 'toggle-block'
//   },
//   general: {
//     type: 'toggle-block'
//   }
// }

// type OPTIONS = 'ONE' | 'TWO'
// type BaseConfig = { [type: string]: OPTIONS }
// type ToggleApp = {
//   addToggle: (name: string, values: Record<string, any>) => Promise<any>
// }
// type DatabaseApp = {
//   addRow: (name: string, values: string[]) => Promise<any>
// }
// type AdvancedConfig = BaseConfig & (ToggleApp | DatabaseApp)

// function blocksHandler(
//   config: Record<string, { type: 'CIRCLE' | 'RECTANGLE' }>
// ): Array<Shape & Base> {
//   return Object.entries(config).map(([id, value]) => {
//     if (value.type === 'CIRCLE') {
//       return { type: 'CIRCLE', diameter: 3, id: 'fdfd',
//                 toggle: () => {}

//      }
//     } else {
//       return { type: 'RECTANGLE', height: 3, width: 5, id: 'fdfd',
//   toggle: () => {}

//      }
//     }
//   })
// }

// // const result = blocksHandler({one: {type: 'CIRCLE', }})

// // result[0].


// (async () => {
//   const conf: BaseConfig = {
//     configuration: {
//       type: 'toggle-block',
//       // addToggle...
//     },
//     databases: {
//       type: 'toggle-block'
//     },
//     general: {
//       type: 'database-block'
//     }
//   }

//   Object.entries(conf).forEach(async ([key, content]) => {
//     Object.assign(conf[key], await blocksHandler(content))
//   })
  
//   const confConf = conf.configuration

//   if (confConf.type === 'toggle-block') {

//   }

// }())