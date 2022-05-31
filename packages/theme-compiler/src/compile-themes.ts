import fs from 'fs/promises'
import path from 'path'
import YAML from 'yaml'
import type {
  CompileOptions,
  ConfigTheme,
  LoadThemeVariantSource,
  MakeAntdTheme,
  MakeMonacoTheme,
  MakeThemes,
  MakeThemesConfig,
  PrepareCSSVars,
  PrepareLessVars,
  PrepareThemeVariants,
  ProcessedTheme,
  ProcessedVariant,
  ReadyTheme,
  ReadyVariant,
  ThemesConfig
} from './types'
import { ThemeSourceType } from './types'
import extractVSCodeToCSSVars from './utils/vscode-to-css-vars'
import extractVSCodeToLessVars from './utils/vscode-to-less-vars'
import VSCodeToMonaco from './utils/vscode-to-monaco'


const compileThemes = async (
  themes: string[],
  options: CompileOptions
): Promise<ThemesConfig> => run(themes, options)

const run = async (sources: string[], options: CompileOptions) => {
  await fs.mkdir(options.outputDir, { recursive: true })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reducer = async (acc: ReadyTheme[], item: any) => [
    ...acc,
    await asyncFold(async (acc, fn) => fn(await acc), item, [
      processTheme(options.outputDir),
      prepareThemeVariants,
      prepareCSSVars,
      prepareLessVars,
      makeThemes
    ])
  ]
  const themes = await asyncFold(reducer, [], sources)

  const config = await makeThemesConfig(
    themes,
    path.join(options.outputDir, 'themes.json')
  )
  return config
}

const asyncFold = async <T, P>(
  reducer: (acc: T, elm: P) => Promise<T>,
  init: T,
  xs: P[]
) => {
  let acc = init
  for (const x of xs) {
    acc = await reducer(acc, x)
  }
  return acc
}

const processTheme = (outputDir: string) => async (fullpath: string) => {
  const themeFile = path.join(fullpath, 'theme.yaml')
  const dirname = path.dirname(fullpath)
  const basename = path.basename(fullpath)
  const themeRaw = await fs.readFile(themeFile, 'utf-8')
  const output = path.join(outputDir, basename)
  await fs.mkdir(output, { recursive: true })

  const parsed: ProcessedTheme = {
    name: dirname, // Override `name` from theme.yaml - this provides the default
    ...YAML.parse(themeRaw),
    paths: {
      base: dirname,
      dir: basename,
      fullpath,
      output
    }
  }

  return parsed
}

const prepareThemeVariants: PrepareThemeVariants = (theme) => ({
  ...theme,
  variants: theme.variants.map((variant, index) => {
    const getData = () =>
      loadThemeVariantSource(
        variant.type,
        path.join(theme.paths.fullpath, variant.source)
      )

    const filename =
      theme.variants.length === 1 || (!index && !variant.name)
        ? theme.name
        : variant.name
        ? `${theme.name}-${variant.name}`
        : variant.title
            .toLowerCase()
            .replace(/([ ])+/g, '-')
            .replace(/([^a-z0-9-])+/g, '')

    const title =
      variant.title ||
      (theme.variants.length === 1 || (!index && !variant.title)
        ? theme.title || theme.name
        : variant.name)

    return {
      ...variant,
      ...(!variant.name ? { name: filename } : {}),
      ...(!variant.title ? { title } : {}),
      getData,
      filename
    }
  })
})

const loadThemeVariantSource: LoadThemeVariantSource = async (
  type,
  filepath
) => {
  // vscode theme
  if (type === ThemeSourceType.VSCode) {
    try {
      const fileData = await import(filepath)
      return fileData
    } catch (err) {
      return false
    }
  }
}

const prepareCSSVars: PrepareCSSVars = (theme) => ({
  ...theme,
  variants: theme.variants.map((variant) => ({
    ...variant,
    getCSSVars: () => variant.getData().then(extractVSCodeToCSSVars)
  }))
})

const prepareLessVars: PrepareLessVars = (theme) => ({
  ...theme,
  variants: theme.variants.map((variant) => ({
    ...variant,
    getLessVars: () => variant.getData().then(extractVSCodeToLessVars)
  }))
})

const makeThemes: MakeThemes = async (theme) => ({
  ...theme,
  variants: await Promise.all(
    theme.variants.map(async (variant: ProcessedVariant) => ({
      ...variant,
      ...(await makeAntdTheme(variant, theme)),
      ...(await makeMonacoTheme(variant, theme))
    }))
  )
})

const makeAntdTheme: MakeAntdTheme = async (variant, theme) => {
  const less = (await import('less')).default
  const lessPath = path.join(theme.paths.fullpath, variant.less)
  // console.log('📸 less:', less)

  let lessSource
  try {
    lessSource = await fs.readFile(lessPath, 'utf-8')
  } catch (error) {
    console.log(error)
    throw new Error('Unable to load less file')
  }

  const lessOptions = {
    paths: [theme.paths.fullpath],
    javascriptEnabled: true
  }

  let rendered
  try {
    const lessVars = await variant.getLessVars()

    rendered = await less.render(lessSource, {
      ...lessOptions,
      ...{ modifyVars: lessVars }
    })
  } catch (error) {
    console.warn(error)
    throw new Error('Unable to compile less file')
  }

  const cssOutput = path.join(theme.paths.output, `${variant.filename}.css`)
  try {
    await fs.writeFile(
      cssOutput,
      `${rendered.css}\n${await variant.getCSSVars()}`
    )
  } catch (error) {
    console.log(error)
    throw new Error('Unable to write rendered css file')
  }

  return {
    ...variant,
    css: `${theme.name}/${variant.filename}.css`
  }
}

const makeMonacoTheme: MakeMonacoTheme = async (variant, theme) => {
  const variantData = await variant.getData()
  const compiled = await VSCodeToMonaco(variantData)

  const monacoFile = `${variant.filename}.monaco.json`

  try {
    await fs.writeFile(
      path.join(theme.paths.output, monacoFile),
      JSON.stringify(compiled, null, 1)
    )
  } catch (error) {
    console.log(error)
    throw new Error('Unable to write monaco theme file')
  }

  return {
    ...variant,
    isDark: variantData.type === 'dark',
    monaco: `${theme.paths.dir}/${variant.filename}.monaco.json`
  }
}

const makeThemesConfig: MakeThemesConfig = async (themes, outputFile) => {
  const themesConfig = {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    version: require('../package.json').version,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    dv: require('../package.json').dv,
    themes: themes.map(
      ({ name, title, description, version, variants, paths, fontStylesheet }) =>
        ({
          base: paths.dir,
          fontStylesheet,
          name,
          title,
          description,
          version,
          variants: variants.map(
            (variant: ReadyVariant) =>
              ({
                css: variant.css,
                isDark: variant.isDark,
                name: variant.name,
                title: variant.title,
                monaco: variant.monaco
              } as ReadyVariant)
          )
        } as ConfigTheme)
    )
  }

  try {
    await fs.writeFile(outputFile, JSON.stringify(themesConfig, null, 1))
    return themesConfig
  } catch (error) {
    console.log(error)
    throw new Error('Unable to write themes config file')
  }
}

export { ThemeSourceType }
export default compileThemes
