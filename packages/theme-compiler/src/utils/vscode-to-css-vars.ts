import kebabCase from 'lodash/fp/kebabCase'
import { ExtractVSCodeToCSSVars } from '../types'

const extractVSCodeToCSSVars: ExtractVSCodeToCSSVars = (themeSource) => {
  const { colors } = themeSource
  const vars = [':root {']
  Object.entries(colors).forEach((item) => {
    let varName = ''
    const varNames = item[0].split('.')
    varNames.forEach((item) => {
      varName += `-${kebabCase(item)}`
    })
    const fullVar = `  -${varName}: ${item[1]};`
    vars.push(fullVar)
  })

  vars.push('}')
  return vars.join('\n')
}

export default extractVSCodeToCSSVars
