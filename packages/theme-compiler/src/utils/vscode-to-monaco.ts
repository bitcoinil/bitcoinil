import {
  convertTheme,
  IVSCodeTheme
} from 'monaco-vscode-textmate-theme-converter'
import { IStandaloneThemeData } from '../types'

const VSCodeToMonaco = (themeSource: IVSCodeTheme): IStandaloneThemeData =>
  convertTheme(themeSource)

export default VSCodeToMonaco
