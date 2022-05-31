import { IVSCodeTheme } from 'monaco-vscode-textmate-theme-converter'

export type CompileOptions = {
  outputDir: string
}

export type PrepareThemeVariants = (theme: ProcessedTheme) => void

export type ThemeProcessorWrapper = (
  base: string
) => (theme: string) => Promise<ProcessedTheme>

export type IsValidThemeDir = (base: string) => (theme: string) => boolean

export type LoadThemeVariantSource = <T>(
  type: T<ThemeSourceType>,
  filepath: string
) => Promise<ThemeVariantSource<T>>

export type PrepareCSSVars = (theme: ProcessedTheme) => void
export type PrepareLessVars = (theme: ProcessedTheme) => void

// export type MakeAntdThemeWrapper = (theme: ProcessedTheme) => MakeAntdTheme
export type MakeAntdTheme = (
  variant: ProcessedVariant,
  theme: ProcessedTheme
) => Promise<ProcessedVariant & AntDVariant>

export type AntDVariant = {
  css: string
}

export type MakeMonacoTheme = (
  variant: ProcessedVariant,
  theme: ProcessedTheme
) => Promise<ProcessedVariant & MonacoVariant>

export type MonacoVariant = {
  monaco: string
  isDark: boolean
}

export type MakeThemesConfig = (
  themes: ReadyTheme[],
  outputDir: string
) => Promise<ThemesConfig>
export type ThemesConfig = {
  version: string
  dv: string
  themes: ConfigTheme[]
}

export type ConfigTheme = {
  name: string
  description: string
  title: string
  version: string
  base: string
  variants: ReadyVariant[]
}



export type CompiledTheme = {
  name: string
  description: string
  title: string
  version: string
  fontStylesheet?: string
  variants: CompiledVariant[]
}

export type ThemeConfig = {
  /** Theme name (lowercase, kebab case, a-z, 0-9) */
  name: string
  /** Theme title */
  title: string
  /** Theme description */
  description: string
  /** Theme Font Stylesheet */
  fontStylesheet?: string
  /** Theme version (semver or whatever) */
  version: string
  /** Theme variants */
  variants: ThemeVariant[]
}

export type CompiledVariant = {
  title: string
  description: string
  name: string
  isDark: boolean
  css: string
  monaco: string
}
export type ThemeVariant = {
  /** Variant title */
  title: string
  /** Variant description */
  description: string
  /** Variant name */
  name: string
  /** Variant source type */
  type: ThemeSourceType
  /** Variant source file */
  source: string
  /** Variant less file path - e.g. `theme.less` */
  less: string
}

export interface ProcessedTheme extends ThemeConfig {
  paths: ThemePaths
  variants: ProcessedVariant[]
}

export interface ProcessedVariant extends ThemeVariant {
  /** Load VSCode source theme */
  getData: () => Promise<IVSCodeTheme>
  /** Get CSS variables */
  getCSSVars: () => Promise<string>
  /** Get Less variables object */
  getLessVars: () => Promise<Record<string, string>>
  filename: string
}

export type ReadyVariant = ProcessedVariant & AntDVariant & MonacoVariant

export type ReadyTheme = ProcessedTheme & {
  variants: ReadyVariant[]
}

export type ThemePaths = {
  /** Dir name of the theme */
  dir: string // Dir name of the theme
  /** Base path on disk where theme is located */
  base: string
  /** Fullpath on disk to theme source */
  fullpath: string
  /** Fullpath on disk where to write these output */
  output: string
}

export const enum ThemeSourceType {
  VSCode = 'vsc'
}

export type ThemeVariantSource<ThemeSourceType> = IVSCodeTheme

export type ExtractVSCodeToCSSVars = (source: IVSCodeTheme) => string
export type ExtractVSCodeToLessVars = (
  source: IVSCodeTheme
) => Record<string, string>

/**
 * Make theme for djitsu from processed theme
 */
export type MakeThemes = (theme: ProcessedTheme) => Promise<ReadyTheme>

export type IStandaloneThemeData = {
  base: string
  colors: Record<string, string>
}
